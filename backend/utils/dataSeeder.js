const Disease = require('../models/Disease');
const Symptom = require('../models/Symptom');
const Rule = require('../models/Rule');

const seedData = async () => {
    try {
        console.log('Seeding Data with Realistic Content...');

        await Disease.deleteMany({});
        await Symptom.deleteMany({});
        await Rule.deleteMany({});

        // ==========================================
        // 1. HUMAN DISEASES
        // ==========================================

        // --- Flu ---
        const flu = await Disease.create({
            code: 'P01',
            name: 'Flu (Influenza)',
            description: 'Infeksi virus pada saluran pernapasan.',
            category: 'human',
            recommendation: { initialAction: ['Istirahat total', 'Minum air hangat'], prevention: ['Masker', 'Cuci tangan'], treatment: ['Paracetamol', 'Vitamin C'], risk: 'Pneumonia' }
        });
        // --- Maag ---
        const maag = await Disease.create({
            code: 'P02',
            name: 'Maag (Gastritis)',
            description: 'Peradangan lambung akibat asam lambung naik.',
            category: 'human',
            recommendation: { initialAction: ['Minum Antasida', 'Makan bubur'], prevention: ['Telat makan dihindari', 'Kurangi pedas'], treatment: ['Obat Lambung Resep'], risk: 'Tukak Lambung' }
        });
        // --- DBD ---
        const dbd = await Disease.create({
            code: 'P03',
            name: 'Demam Berdarah (DBD)',
            description: 'Infeksi virus dengue oleh nyamuk Aedes.',
            category: 'human',
            recommendation: { initialAction: ['Cairan elektrolit', 'Cek trombosit'], prevention: ['3M Plus'], treatment: ['Rawat Inap'], risk: 'Syok/Kematian' }
        });
        // --- Tifus ---
        const tifus = await Disease.create({
            code: 'P04',
            name: 'Tifus (Tifoid)',
            description: 'Infeksi bakteri Salmonella typhi.',
            category: 'human',
            recommendation: { initialAction: ['Bed rest', 'Diet lunak'], prevention: ['Hygiene makanan'], treatment: ['Antibiotik'], risk: 'Usus bocor' }
        });
        // --- Covid-19 ---
        const covid = await Disease.create({
            code: 'P05',
            name: 'COVID-19',
            description: 'Infeksi virus SARS-CoV-2.',
            category: 'human',
            recommendation: { initialAction: ['Isolasi', 'Swab Test'], prevention: ['Vaksin', 'Masker'], treatment: ['Antivirus'], risk: 'Gagal napas' }
        });

        // Symptoms Human
        const h_demam = await Symptom.create({ code: 'H01', name: 'Demam Tinggi', category: 'human', question: 'Apakah Anda mengalami demam tinggi?' });
        const h_batuk = await Symptom.create({ code: 'H02', name: 'Batuk Kering/Berdahak', category: 'human', question: 'Apakah Anda mengalami batuk?' });
        const h_pilek = await Symptom.create({ code: 'H03', name: 'Pilek / Hidung Mampet', category: 'human', question: 'Apakah hidung Anda tersumbat?' });
        const h_mual = await Symptom.create({ code: 'H04', name: 'Mual / Muntah', category: 'human', question: 'Apakah Anda merasa mual atau ingin muntah?' });
        const h_perih = await Symptom.create({ code: 'H05', name: 'Nyeri Ulu Hati', category: 'human', question: 'Apakah ulu hati terasa perih?' });
        const h_bintik = await Symptom.create({ code: 'H06', name: 'Bintik Merah Kulit', category: 'human', question: 'Apakah muncul bintik merah di kulit?' });
        const h_sendi = await Symptom.create({ code: 'H07', name: 'Nyeri Sendi Hebat', category: 'human', question: 'Apakah sendi terasa nyeri hebat?' });
        const h_lidah = await Symptom.create({ code: 'H08', name: 'Lidah Putih Kotor', category: 'human', question: 'Apakah lidah terlihat putih?' });
        const h_anosmia = await Symptom.create({ code: 'H09', name: 'Hilang Penciuman (Anosmia)', category: 'human', question: 'Apakah Anda kehilangan penciuman?' });
        const h_sesak = await Symptom.create({ code: 'H10', name: 'Sesak Napas', category: 'human', question: 'Apakah Anda merasa sesak napas?' });

        // Rules Human
        await Rule.create({ disease: flu._id, category: 'human', symptoms: [{ symptom: h_demam._id, cf_weight: 0.8 }, { symptom: h_batuk._id, cf_weight: 0.7 }, { symptom: h_pilek._id, cf_weight: 0.9 }] });
        await Rule.create({ disease: maag._id, category: 'human', symptoms: [{ symptom: h_mual._id, cf_weight: 0.7 }, { symptom: h_perih._id, cf_weight: 0.9 }] });
        await Rule.create({ disease: dbd._id, category: 'human', symptoms: [{ symptom: h_demam._id, cf_weight: 0.9 }, { symptom: h_bintik._id, cf_weight: 0.95 }, { symptom: h_sendi._id, cf_weight: 0.8 }, { symptom: h_mual._id, cf_weight: 0.6 }] });
        await Rule.create({ disease: tifus._id, category: 'human', symptoms: [{ symptom: h_demam._id, cf_weight: 0.8 }, { symptom: h_lidah._id, cf_weight: 0.9 }, { symptom: h_mual._id, cf_weight: 0.6 }] });
        await Rule.create({ disease: covid._id, category: 'human', symptoms: [{ symptom: h_demam._id, cf_weight: 0.8 }, { symptom: h_batuk._id, cf_weight: 0.8 }, { symptom: h_anosmia._id, cf_weight: 0.95 }, { symptom: h_sesak._id, cf_weight: 0.85 }] });


        // ==========================================
        // 2. ANIMAL / PLANT DISEASES
        // ==========================================

        // --- Kucing: Panleukopenia (Virus Distemper) ---
        const panleukopenia = await Disease.create({
            code: 'A01',
            name: 'Feline Panleukopenia',
            description: 'Infeksi virus mematikan pada kucing menyerang pencernaan & sumsum tulang.',
            category: 'animal',
            recommendation: { initialAction: ['Isolasi ketat', 'Infus cairan'], prevention: ['Vaksin Tricat'], treatment: ['Supportive care intensif'], risk: 'Kematian sangat tinggi' }
        });
        // --- Kucing: Scabies (Jamur/Tungau) ---
        const scabies = await Disease.create({
            code: 'A02',
            name: 'Scabies / Jamuran',
            description: 'Infeksi kulit akibat tungau Notoedres cati.',
            category: 'animal',
            recommendation: { initialAction: ['Mandikan sampo anti kutu'], prevention: ['Jaga kebersihan kandang'], treatment: ['Suntik ivermectin', 'Salep'], risk: 'Menular ke manusia' }
        });
        // --- Anjing: Parvovirus ---
        const parvo = await Disease.create({
            code: 'A03',
            name: 'Canine Parvovirus',
            description: 'Virus sangat menular menyerang usus anjing.',
            category: 'animal',
            recommendation: { initialAction: ['Stop makan/minum (puasa) jika muntah', 'Segera ke dokter'], prevention: ['Vaksinasi lengkap'], treatment: ['Infus', 'Antibiotik'], risk: 'Dehidrasi fatal' }
        });
        // --- Tanaman: Kutu Putih ---
        const kutu_putih = await Disease.create({
            code: 'A04',
            name: 'Hama Kutu Putih',
            description: 'Hama penghisap cairan yang membuat daun layu/keriting.',
            category: 'animal', // merging plants into 'animal' category as requested "juga revisi pada mode hewan/tumbuhan"
            recommendation: { initialAction: ['Semprot air sabun'], prevention: ['Cek rutin balik daun'], treatment: ['Pestisida organik/kimia'], risk: 'Tanaman mati kerdil' }
        });

        // Symptoms Animal
        const a_muntah = await Symptom.create({ code: 'S01', name: 'Muntah-muntah', category: 'animal', question: 'Apakah hewan muntah-muntah?' });
        const a_diare_darah = await Symptom.create({ code: 'S02', name: 'Diare Berdarah/Bau Amis', category: 'animal', question: 'Apakah hewan diare berdarah?' });
        const a_lemas = await Symptom.create({ code: 'S03', name: 'Hewan Lemas / Tidak Mau Makan', category: 'animal', question: 'Apakah hewan terlihat lemas?' });
        const a_gatal = await Symptom.create({ code: 'S04', name: 'Sering Garuk-garuk', category: 'animal', question: 'Apakah hewan sering menggaruk?' });
        const a_kerak = await Symptom.create({ code: 'S05', name: 'Kulit Berkerak/Bulu Rontok', category: 'animal', question: 'Apakah kulit berkerak?' });
        const a_bercak_putih = await Symptom.create({ code: 'S06', name: 'Bercak Putih Kapas di Daun', category: 'animal', question: 'Apakah ada bercak putih di daun?' }); // Tanaman
        const a_daun_keriting = await Symptom.create({ code: 'S07', name: 'Daun Mengerut/Keriting', category: 'animal', question: 'Apakah daun mengerut?' }); // Tanaman

        // Rules Animal
        await Rule.create({ disease: panleukopenia._id, category: 'animal', symptoms: [{ symptom: a_muntah._id, cf_weight: 0.8 }, { symptom: a_diare_darah._id, cf_weight: 0.9 }, { symptom: a_lemas._id, cf_weight: 0.9 }] });
        await Rule.create({ disease: scabies._id, category: 'animal', symptoms: [{ symptom: a_gatal._id, cf_weight: 0.9 }, { symptom: a_kerak._id, cf_weight: 1.0 }] });
        await Rule.create({ disease: parvo._id, category: 'animal', symptoms: [{ symptom: a_muntah._id, cf_weight: 0.8 }, { symptom: a_diare_darah._id, cf_weight: 0.9 }, { symptom: a_lemas._id, cf_weight: 0.85 }] });
        await Rule.create({ disease: kutu_putih._id, category: 'animal', symptoms: [{ symptom: a_bercak_putih._id, cf_weight: 1.0 }, { symptom: a_daun_keriting._id, cf_weight: 0.7 }] });


        // ==========================================
        // 3. HARDWARE DISEASES (Laptop/HP)
        // ==========================================

        // --- HDD/SSD Rusak ---
        const hdd = await Disease.create({
            code: 'H01',
            name: 'Hardisk/SSD Corrupt',
            description: 'Kerusakan media penyimpanan menyebabkan gagal booting atau data hilang.',
            category: 'hardware',
            recommendation: { initialAction: ['Backup data segera', 'Chkdsk'], prevention: ['Jangan banting laptop', 'Shutdown yang benar'], treatment: ['Ganti SSD/HDD'], risk: 'Kehilangan Data Permanen' }
        });
        // --- RAM Rusak ---
        const ram = await Disease.create({
            code: 'H02',
            name: 'RAM Error',
            description: 'Kegagalan memori akses acak.',
            category: 'hardware',
            recommendation: { initialAction: ['Bersihkan pin kuning RAM'], prevention: ['Stabilizer listrik'], treatment: ['Ganti keping RAM'], risk: 'BSOD Berulang' }
        });
        // --- Overheat / Kipas Mati ---
        const overheat = await Disease.create({
            code: 'H03',
            name: 'Overheating (Panas Berlebih)',
            description: 'Sistem pendingin tidak bekerja optimal.',
            category: 'hardware',
            recommendation: { initialAction: ['Bersihkan debu kipas'], prevention: ['Ganti Thermal Paste'], treatment: ['Ganti Kipas', 'Cooling Pad'], risk: 'Komponen lain terbakar (CPU/VGA)' }
        });
        // --- Baterai Bocor (HP/Laptop) ---
        const baterai = await Disease.create({
            code: 'H04',
            name: 'Baterai Bocor/Drop',
            description: 'Penurunan kapasitas penyimpanan daya baterai.',
            category: 'hardware',
            recommendation: { initialAction: ['Kalibrasi baterai'], prevention: ['Jangan cas sambil main game'], treatment: ['Ganti Baterai Original'], risk: 'Baterai kembung/meledak' }
        });

        // Symptoms Hardware
        const k_lambat = await Symptom.create({ code: 'K01', name: 'Laptop/HP Sangat Lambat', category: 'hardware', question: 'Apakah laptop/HP sangat lambat?' });
        const k_bunyi = await Symptom.create({ code: 'K02', name: 'Bunyi Kasar/Cetek-cetek', category: 'hardware', question: 'Apakah ada bunyi kasar?' });
        const k_bsod = await Symptom.create({ code: 'K03', name: 'Layar Biru (BSOD) / Sering Restart', category: 'hardware', question: 'Apakah muncul layar biru (BSOD)?' });
        const k_no_boot = await Symptom.create({ code: 'K04', name: 'Stuck di Logo / Gagal Masuk Windows', category: 'hardware', question: 'Apakah laptop stuck di logo?' });
        const k_panas = await Symptom.create({ code: 'K05', name: 'Body Terasa Sangat Panas', category: 'hardware', question: 'Apakah body laptop panas?' });
        const k_kipas_brisik = await Symptom.create({ code: 'K06', name: 'Suara Kipas Kencang/Berisik', category: 'hardware', question: 'Apakah kipas berisik?' });
        const k_mati_sendiri = await Symptom.create({ code: 'K07', name: 'Tiba-tiba Mati saat Dipakai Berat', category: 'hardware', question: 'Apakah laptop mati tiba-tiba?' });
        const k_bat_drop = await Symptom.create({ code: 'K08', name: 'Baterai Cepat Habis / Persentase Lompat', category: 'hardware', question: 'Apakah baterai cepat habis?' });
        const k_kembung = await Symptom.create({ code: 'K09', name: 'Body Gadget Menggelembung/Terangkat', category: 'hardware', question: 'Apakah body gadget menggelembung?' });

        // Rules Hardware
        await Rule.create({ disease: hdd._id, category: 'hardware', symptoms: [{ symptom: k_lambat._id, cf_weight: 0.6 }, { symptom: k_bunyi._id, cf_weight: 0.9 }, { symptom: k_bsod._id, cf_weight: 0.5 }, { symptom: k_no_boot._id, cf_weight: 0.8 }] });
        // Fixed typo: k_ati_sendiri -> k_mati_sendiri (removed from RAM rule as it was likely a copy-paste error from overheat rule context in previous attempt)
        await Rule.create({ disease: ram._id, category: 'hardware', symptoms: [{ symptom: k_bsod._id, cf_weight: 0.9 }, { symptom: k_no_boot._id, cf_weight: 0.7 }] });

        await Rule.create({ disease: overheat._id, category: 'hardware', symptoms: [{ symptom: k_panas._id, cf_weight: 0.9 }, { symptom: k_kipas_brisik._id, cf_weight: 0.8 }, { symptom: k_mati_sendiri._id, cf_weight: 0.9 }, { symptom: k_lambat._id, cf_weight: 0.5 }] });
        await Rule.create({ disease: baterai._id, category: 'hardware', symptoms: [{ symptom: k_bat_drop._id, cf_weight: 0.9 }, { symptom: k_kembung._id, cf_weight: 1.0 }, { symptom: k_mati_sendiri._id, cf_weight: 0.4 }] });

        console.log('Data Seeded Successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedData;
