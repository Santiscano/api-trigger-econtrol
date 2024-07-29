import { Router } from "express";
import EspejoController from "../controller/EspejoController.js";
import CleardigitalizadosController from "../controller/CleardigitalizadosController.js";
import ClearhistryController from "../controller/ClearhistryController.js";
const router = Router();

const espejoController = new EspejoController();
const cleardigitalizadosController = new CleardigitalizadosController();
const clearhistryController = new ClearhistryController();

router.get("/", (req, res) => {
    res.send("Hello World");
});
// router.get("/test-api", espejoController.getTriggerController);
router.get("/clean-tb-pedidos-giditalizado", cleardigitalizadosController.functionMigration);
router.get("/clean-tb-preliquidacion-tmp-historico", clearhistryController.getClearhistryController);


export default router;
