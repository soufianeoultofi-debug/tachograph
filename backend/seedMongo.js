const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const User = require('./models/User');
const Client = require('./models/Client');
const Truck = require('./models/Truck');
const WorkOrder = require('./models/WorkOrder');
const Invoice = require('./models/Invoice');
const CalibrationCertificate = require('./models/CalibrationCertificate');
const Notification = require('./models/Notification');
const Settings = require('./models/Settings');

dotenv.config({ path: path.join(__dirname, '.env') });

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing in backend/.env');
  }

  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Connected to MongoDB for seeding');

  const adminEmail = 'admin@tachograph.ma';
  const adminName = 'admin';

  let admin = await User.findOne({ email: adminEmail }).select('+password');
  if (!admin) {
    admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: 'admin',
      role: 'admin',
    });
  } else {
    admin.name = adminName;
    admin.role = 'admin';
    admin.password = 'admin';
    await admin.save();
  }

  const clients = [
    { nom: 'Société Atlas Transport', telephone: '+212612345678', entreprise: 'Atlas Logistics', email: 'contact@atlastransport.ma' },
    { nom: 'Yassine El Amrani', telephone: '+212661234567', entreprise: 'El Amrani Freight', email: 'yassine@elamrani.ma' },
    { nom: 'Coopérative Souss Camions', telephone: '+212528123456', entreprise: 'Souss Coop', email: 'info@sousscoop.ma' },
  ];

  for (const client of clients) {
    await Client.findOneAndUpdate(
      { email: client.email },
      { $set: client },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const trucks = [
    { numero: 'MA-45678-A', vin: 'WDB9634031L123456', client: 'Société Atlas Transport', appareil: 'Continental VDO DTCO 4.1', statut: 'Active' },
    { numero: 'MA-23891-B', vin: 'VF624GPA000987654', client: 'Yassine El Amrani', appareil: 'Stoneridge SE5000', statut: 'Maintenance' },
    { numero: 'MA-77441-C', vin: 'YS2R4X20005543210', client: 'Coopérative Souss Camions', appareil: 'EFAS 4.0', statut: 'Active' },
  ];

  for (const truck of trucks) {
    await Truck.findOneAndUpdate(
      { numero: truck.numero },
      { $set: truck },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const workOrders = [
    { camion: 'MA-45678-A', client: 'Société Atlas Transport', service: 'Étalonnage tachygraphe', technicien: 'Hamza B.', statut: 'Completed' },
    { camion: 'MA-23891-B', client: 'Yassine El Amrani', service: 'Diagnostic capteur vitesse', technicien: 'Soufiane O.', statut: 'In Progress' },
    { camion: 'MA-77441-C', client: 'Coopérative Souss Camions', service: 'Installation boîtier neuf', technicien: 'Nabil A.', statut: 'Pending' },
  ];

  for (const order of workOrders) {
    await WorkOrder.findOneAndUpdate(
      { camion: order.camion, service: order.service },
      { $set: order },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const invoices = [
    { numero: 'FAC-2026-001', client: 'Société Atlas Transport', camion: 'MA-45678-A', montant: 1800, statut: 'Paid' },
    { numero: 'FAC-2026-002', client: 'Yassine El Amrani', camion: 'MA-23891-B', montant: 950, statut: 'Pending' },
    { numero: 'FAC-2026-003', client: 'Coopérative Souss Camions', camion: 'MA-77441-C', montant: 2200, statut: 'Pending' },
  ];

  for (const invoice of invoices) {
    await Invoice.findOneAndUpdate(
      { numero: invoice.numero },
      { $set: invoice },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const certificates = [
    { cert_id: 'CERT-MA-2026-1001', client: 'Société Atlas Transport', truck: 'MA-45678-A', date_issued: new Date('2026-02-10'), expiration: new Date('2027-02-10') },
    { cert_id: 'CERT-MA-2026-1002', client: 'Yassine El Amrani', truck: 'MA-23891-B', date_issued: new Date('2026-03-01'), expiration: new Date('2027-03-01') },
  ];

  for (const cert of certificates) {
    await CalibrationCertificate.findOneAndUpdate(
      { cert_id: cert.cert_id },
      { $set: cert },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const notifications = [
    { text_content: 'Contrôle périodique prévu pour MA-45678-A', time_label: 'Il y a 2h', type: 'info', is_read: false },
    { text_content: 'Facture FAC-2026-002 en attente de paiement', time_label: 'Il y a 1j', type: 'warning', is_read: false },
    { text_content: 'Certificat CERT-MA-2026-1001 généré avec succès', time_label: 'À l\'instant', type: 'success', is_read: false },
  ];

  for (const notif of notifications) {
    await Notification.findOneAndUpdate(
      { text_content: notif.text_content },
      { $set: notif },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  await Settings.findOneAndUpdate(
    {},
    {
      $set: {
        company_name: 'Tachograph Maroc',
        company_email: 'contact@tachograph.ma',
        company_phone: '+212522000111',
        timezone: 'Africa/Casablanca',
        currency: 'DH',
        language: 'fr',
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('Seed completed successfully');
  console.log('Login credentials:');
  console.log('username/email: admin');
  console.log('password: admin');

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error('Seed failed:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  });
