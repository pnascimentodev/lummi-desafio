import { Router } from 'express';
import multer from 'multer';
import { uploadInvoice, getInvoiceSummary, downloadInvoice, } from '../controllers/invoiceController';
import path from 'path';
import fs from 'fs';
import { getDashboardData, getTotals } from '../controllers/dashboardController';

const router = Router();

const uploadDir = path.join(__dirname, '../../uploads/');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Pasta 'uploads' criada em: ${uploadDir}`);
} else {
    console.log(`Pasta 'uploads' já existe em: ${uploadDir}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadInvoice); 

router.get('/summary', getInvoiceSummary);

router.get('/dashboard', getDashboardData);

router.get('/totals', getTotals);

router.get('/download/:id', downloadInvoice);


export default router;
