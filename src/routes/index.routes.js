import { Router } from "express";
import EspejoController from "../controller/EspejoController.js";
import CleardigitalizadosController from "../controller/CleardigitalizadosController.js";
const router = Router();

const espejoController = new EspejoController();
const cleardigitalizadosController = new CleardigitalizadosController();

router.get("/test-api", espejoController.getTriggerController);
router.get("/test-clear", cleardigitalizadosController.functionMigration);
// router.get("/pedidos-digitalizados", espejoController.pedidosDigitalizadosController);


export default router;
