import express from 'express';
import RecordsController from '../controller';
import Validator from '../middleware/validator';

const router = express.Router();

router.get('/records', Validator.requestValidator, RecordsController.getRecords);

export default router;
