import { Router } from "express";
import CleanTBDigitalizadosController from "../controller/CleanTBDigitalizados.controller.js";
// import EspejoController from "../controller/EspejoController.js";
// import CleardigitalizadosController from "../controller/CleardigitalizadosController.js";
// import ClearhistryController from "../controller/ClearhistryController.js";
const router = Router();

const cleanTBDigitalizados = new CleanTBDigitalizadosController();
// const espejoController = new EspejoController();
// const cleardigitalizadosController = new CleardigitalizadosController();
// const clearhistryController = new ClearhistryController();

router.get("/count-pedidos-digitalizados", cleanTBDigitalizados.countConsecutivos)
router.post("/clean-tb-pedidos-digitalizado", cleanTBDigitalizados.Migration);
// router.get("/test", espejoController.testApi);
// router.get("/clean-tb-pedidos-digitalizado", cleardigitalizadosController.functionMigration);
// router.get("/clean-tb-preliquidacion-tmp-historico", clearhistryController.getClearhistryController);


export default router;
