USE tachograph_db;

-- Clients
INSERT INTO clients (nom, telephone, entreprise, email) VALUES
('Mohcine El Amrani', '0661234567', 'Trans Maroc SARL', 'mohcine.elamrani@gmail.com'),
('Anouar Benali', '0672345678', 'Logistique Atlas', 'anouar.benali@yahoo.fr'),
('Youssef Tazi', '0653456789', 'Transport Rif Express', 'youssef.tazi@hotmail.com'),
('Rachid Bouazza', '0694567890', 'Sahara Freight', 'rachid.bouazza@gmail.com'),
('Karim Idrissi', '0635678901', 'Cargo Fes', 'karim.idrissi@gmail.com'),
('Omar Chraibi', '0706789012', 'Casablanca Transport', 'omar.chraibi@outlook.com'),
('Hamza Fassi', '0667890123', 'Nord Logistique', 'hamza.fassi@gmail.com'),
('Samir Alaoui', '0648901234', 'Express Tanger Med', 'samir.alaoui@yahoo.fr');

-- Trucks
INSERT INTO trucks (numero, vin, client, appareil, statut) VALUES
('A-7823-MA', 'WDB96340310876543', 'Mohcine El Amrani', 'VDO DTCO 4.1', 'Active'),
('B-4501-MA', 'WDB96340310654321', 'Anouar Benali', 'VDO DTCO 4.0', 'Active'),
('C-9187-MA', 'WDB96340310234567', 'Youssef Tazi', 'Stoneridge SE5000', 'In Repair'),
('D-3342-MA', 'WDB96340310987654', 'Rachid Bouazza', 'VDO DTCO 4.1', 'Active'),
('E-6715-MA', 'WDB96340310112233', 'Karim Idrissi', 'VDO DTCO 3.0', 'Active'),
('F-2290-MA', 'WDB96340310445566', 'Omar Chraibi', 'Stoneridge SE5000', 'In Repair'),
('G-8834-MA', 'WDB96340310778899', 'Hamza Fassi', 'VDO DTCO 4.1', 'Active'),
('H-1156-MA', 'WDB96340310334455', 'Samir Alaoui', 'VDO DTCO 4.0', 'Active'),
('J-5573-MA', 'WDB96340310556677', 'Mohcine El Amrani', 'Continental VDO', 'Active'),
('K-9901-MA', 'WDB96340310889900', 'Anouar Benali', 'VDO DTCO 4.1', 'Active');

-- Work Orders
INSERT INTO work_orders (camion, client, service, technicien, statut) VALUES
('Camion A-7823-MA', 'Mohcine El Amrani', 'Etalonnage periodique', 'Soufiane Lotoviche', 'Completed'),
('Camion B-4501-MA', 'Anouar Benali', 'Remplacement capteur', 'Sara Benmoussa', 'Completed'),
('Camion C-9187-MA', 'Youssef Tazi', 'Reparation tachographe', 'Soufiane Lotoviche', 'In Progress'),
('Camion D-3342-MA', 'Rachid Bouazza', 'Etalonnage initial', 'Khalid Ziani', 'Completed'),
('Camion E-6715-MA', 'Karim Idrissi', 'Verification annuelle', 'Sara Benmoussa', 'Pending'),
('Camion F-2290-MA', 'Omar Chraibi', 'Remplacement appareil', 'Soufiane Lotoviche', 'In Progress'),
('Camion G-8834-MA', 'Hamza Fassi', 'Etalonnage periodique', 'Khalid Ziani', 'Completed'),
('Camion J-5573-MA', 'Mohcine El Amrani', 'Mise a jour logiciel', 'Sara Benmoussa', 'Pending'),
('Camion K-9901-MA', 'Anouar Benali', 'Etalonnage periodique', 'Soufiane Lotoviche', 'Completed'),
('Camion H-1156-MA', 'Samir Alaoui', 'Verification annuelle', 'Khalid Ziani', 'In Progress');

-- Invoices
INSERT INTO invoices (numero, client, camion, montant, statut) VALUES
('FAC-2026-001', 'Mohcine El Amrani', 'Camion A-7823-MA', '3 500 DH', 'Paid'),
('FAC-2026-002', 'Anouar Benali', 'Camion B-4501-MA', '5 200 DH', 'Paid'),
('FAC-2026-003', 'Youssef Tazi', 'Camion C-9187-MA', '7 800 DH', 'Pending'),
('FAC-2026-004', 'Rachid Bouazza', 'Camion D-3342-MA', '4 000 DH', 'Paid'),
('FAC-2026-005', 'Karim Idrissi', 'Camion E-6715-MA', '2 500 DH', 'Pending'),
('FAC-2026-006', 'Omar Chraibi', 'Camion F-2290-MA', '9 100 DH', 'Pending'),
('FAC-2026-007', 'Hamza Fassi', 'Camion G-8834-MA', '3 800 DH', 'Paid'),
('FAC-2026-008', 'Mohcine El Amrani', 'Camion J-5573-MA', '2 900 DH', 'Pending'),
('FAC-2026-009', 'Anouar Benali', 'Camion K-9901-MA', '3 500 DH', 'Paid'),
('FAC-2026-010', 'Samir Alaoui', 'Camion H-1156-MA', '4 200 DH', 'Pending');

-- Certificates
INSERT INTO certificates (cert_id, client, truck, date_issued, expiration) VALUES
('CERT-2026-001', 'Mohcine El Amrani', 'Camion A-7823-MA', '2026-01-15', '2028-01-15'),
('CERT-2026-002', 'Anouar Benali', 'Camion B-4501-MA', '2026-02-03', '2028-02-03'),
('CERT-2026-003', 'Rachid Bouazza', 'Camion D-3342-MA', '2026-01-28', '2028-01-28'),
('CERT-2026-004', 'Hamza Fassi', 'Camion G-8834-MA', '2026-03-01', '2028-03-01'),
('CERT-2025-010', 'Anouar Benali', 'Camion K-9901-MA', '2025-06-20', '2026-06-20'),
('CERT-2025-008', 'Karim Idrissi', 'Camion E-6715-MA', '2024-12-10', '2026-04-10');

-- Notifications
INSERT INTO notifications (text_content, time_label, is_read, type) VALUES
('Certificat CERT-2025-008 expire dans 29 jours', 'Il y a 2 min', 0, 'warning'),
('Nouvel ordre de travail pour Camion C-9187-MA', 'Il y a 15 min', 0, 'info'),
('Facture FAC-2026-002 payee par Anouar Benali', 'Il y a 1h', 0, 'success'),
('Camion F-2290-MA en reparation', 'Il y a 3h', 0, 'warning'),
('Certificat CERT-2026-004 genere avec succes', 'Il y a 5h', 1, 'success'),
('Nouveau client Samir Alaoui ajoute', 'Hier', 1, 'info'),
('Etalonnage termine pour Camion A-7823-MA', 'Hier', 1, 'success'),
('Facture FAC-2026-004 payee par Rachid Bouazza', 'Il y a 2 jours', 1, 'success');
