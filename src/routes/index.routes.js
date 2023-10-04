import { Router } from "express";
import EspejoController from "../controller/EspejoController.js";
const router = Router();

const espejoController = new EspejoController();

router.get("/test-api", espejoController.getTriggerController);
router.get("/pedidos-digitalizados", espejoController.pedidosDigitalizadosController);


export default router;
