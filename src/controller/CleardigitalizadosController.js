import CleardigitalizadosModel from "../model/CleardigitalizadosModel.js";
class CleardigitalizadosController {
  constructor() {
    this.CleardigitalizadosModel = new CleardigitalizadosModel();
  }

  functionMigration = async (req, res) => {
    // *trae los consecutivos
    const data = await this.CleardigitalizadosModel.getpedidosNumeracionPagadosModel()
    .catch((e) => res.status(401).json({ message: "fallo getpedidosNumeracionPagadosModel" }));
    console.log('consecutivos', data);
    
    if (data) {
      const consecutivos = data.map((key) => key.CONSECUTIVO);
      const tiene_pedidos = [];
      const comprobantes_actualizados = [];
      const comprobantes_sin_actualizar = [];
      if (consecutivos.length > 0) {
        for (const element of consecutivos) {
          // *trae los pedidos de la madre
          console.log('ciclo consecutivos', element);
          const result_getPreliquidacionesPagadas = await this.CleardigitalizadosModel.getPreliquidacionesPagadasMadreModel(element)

          if (result_getPreliquidacionesPagadas.length === 0) {
            console.log({ "no tiene pedidos ": element });
            // *actualiza los consecutivos que no tienen pedidos
            await this.CleardigitalizadosModel.updateEmptyAuthPagadosMomModel(element)
              .then((response) => comprobantes_actualizados.push(element))
              .catch((e) => comprobantes_sin_actualizar.push(element));
          } else {
            tiene_pedidos.push(element);
          }
        }

        console.log('consecutivos con pedidos', tiene_pedidos);
        if (tiene_pedidos.length === 0) {
          return res.status(401).json({
            message: "no hay pedidos",
            data,
            tiene_pedidos,
          });
        }
        // *trae todos los pedidos de la madre
        const getAll_pedidos = await this.CleardigitalizadosModel.getAllPedidosPagadosMadreModel(tiene_pedidos);
        console.log('cantidad pedidos madre', getAll_pedidos.length);

        const result_Data = getAll_pedidos.map((codigos) => {
          return [
            codigos.CODIGO_PK,
            codigos.TB_PEDIDOS_NIT,
            codigos.TB_PEDIDOS_CLIENTE,
            codigos.TB_PEDIDOS_MARCA,
            codigos.TB_PEDIDOS_CODIGO_ZONA,
            codigos.TB_PEDIDOS_NOMBRE_ZONA,
            codigos.TB_PEDIDOS_CIUDAD,
            codigos.TB_PEDIDOS_CAMPANA,
            codigos.TB_PEDIDOS_FECHA,
            codigos.TB_PEDIDOS_NRO_FACTURA,
            codigos.TB_PEDIDOS_NRO_PEDIDO,
            codigos.TB_PEDIDOS_CONSECUTIVO,
            codigos.TB_PEDIDOS_BARCODE_CAJA,
            codigos.TB_PEDIDOS_TIPO_PRODUCTO,
            codigos.TB_PEDIDOS_CONTENIDO_CAJA,
            codigos.TB_PEDIDOS_ID_ASESORA,
            codigos.TB_PEDIDOS_CEDULA,
            codigos.TB_PEDIDOS_NOMBRE_ASESORA,
            codigos.TB_PEDIDOS_DIRECCION_ASESORA,
            codigos.TB_PEDIDOS_DPTO_ASESORA,
            codigos.TB_PEDIDOS_BARRIO_ASESORA,
            codigos.TB_PEDIDOS_VEREDA,
            codigos.TB_PEDIDOS_MUNICIPIO_ENVIEXPRESS,
            codigos.TB_PEDIDOS_CELULAR_ASESORA,
            codigos.TB_PEDIDOS_MOVIL_ASESORA,
            codigos.TB_PEDIDOS_AUDITAR,
            codigos.TB_PEDIDOS_CAJAS,
            codigos.TIEMPO_TRANSITO_BODEGA,
            codigos.TIEMPO_BODEGA_REPARTO,
            codigos.TIEMPO_BODEGA_DIGITALIZADO,
            codigos.TIEMPO_TRANSITO_DIGITALIZADO,
            codigos.TIEMPO_REPARTO_DIGITALIZADO,
            codigos.TIPO_DE_CARGA,
            codigos.TIPO_DESTINO,
            codigos.PROMESA_HRS,
            codigos.ANS,
            codigos.METODO_DE_PAGO,
            codigos.ESTADO,
            codigos.EN_BODEGA_FECHA,
            codigos.EN_REPARTO_FECHA,
            codigos.ESTADO_ENTREGADO,
            codigos.EN_ENTREGADO_FECHA,
            codigos.DIGITALIZADO_FECHA,
            codigos.SINIESTRO_FECHA,
            codigos.ESTADO_DIGITALIZADO,
            codigos.ESTADO_NO_ENTREGADO,
            codigos.EN_NO_ENTREGADO_FECHA,
            codigos.ESTADO_REENVIO,
            codigos.EN_REENVIO_FECHA,
            codigos.EN_RETORNO_FECHA,
            codigos.REZAGO_FECHA,
            codigos.NOVEDAD,
            codigos.NOTA,
            codigos.NOTAS_DE_OPERACION,
            codigos.CEDI,
            codigos.ACTIVO,
            codigos.FECHA_HORA,
            codigos.FECHA,
            codigos.CODIGO_DE_CARGA,
            codigos.ORDEN_DE_SERVICIO,
            codigos.ORDEN_DE_DESPACHO,
            codigos.PLACA,
            codigos.PLACA_DE_REPARTO,
            codigos.TRANSPORTADOR,
            codigos.FECHA_CARGA,
            codigos.ENCONTRADO_EN_CONTEO,
            codigos.CONSECUTIVO_CONTEO,
            codigos.CODIGO_DE_CARGUE,
            codigos.MANIFIESTO_URBANO,
            codigos.CODIGO_DE_REENVIO,
            codigos.CODIGO_DE_RETORNO,
            codigos.ESTADO_SEGMENTACION_DE_CONTEO,
            codigos.ESTADO_CODIGO_DE_ZONA,
            codigos.CODIGO_CIUDAD,
            codigos.MAIL_GROUP,
            codigos.PLACA_MP,
            codigos.NOMBRE_CONDUCTOR,
            codigos.LINK,
            codigos.FOTOGRAFIA,
            codigos.TEST,
            codigos.USUARIO_REGISTRO,
            codigos.USUARIO_EN_BODEGA,
            codigos.USUARIO_EN_REPARTO,
            codigos.TOKEN,
            codigos.DESPACHO_API,
            codigos.DESPACHO_ID,
            codigos.CODE_STATUS,
            codigos.EN_TRANSBORDO_FECHA,
            codigos.CHECK_TRANSITO,
            codigos.CHECK_TRANSITO_A_CEDI,
            codigos.CHECK_EN_BODEGA_VERIFICACION,
            codigos.CHECK_EN_BODEGA,
            codigos.CHECK_EN_REPARTO,
            codigos.CHECK_DIGITALIZADO,
            codigos.RADICADO,
            codigos.RADICADOSC,
            codigos.ESTADO_MOVE,
            codigos.ESTADO_MOVE_RECORDS,
            codigos.ESTADO_MOVE_EC,
            codigos.CODIGO_FLETE,
            codigos.VR_UNITARIO_DIST,
            codigos.VR_UNITARIO_VEREDA_DIST,
            codigos.VR_ADICIONAL_DIST,
            codigos.VR_FLETE_DIST,
            codigos.OTROS_COSTOS_DIST,
            codigos.PRE_LIQUIDACION,
            codigos.FECHA_PRE_LIQUIDACION,
            codigos.ESTADO_PRE_LIQUIDACION,
            codigos.REGISTRO_MOVIDO_PRE_LIQUIDACION,
            codigos.ORDEN_DE_COMPRA,
            codigos.FECHA_ORDEN_DE_COMPRA,
            codigos.VR_FAC,
            codigos.VR_FTE_FAC,
            codigos.NO_FAC,
            codigos.FECHA_FAC,
            codigos.ESTADO_TRACKING,
            codigos.ESTADO_PRELIQUIDACION,
            codigos.NTF_EN_REPARTO,
            codigos.NTF_DIGITALIZADO,
          ];
        });
        // *insertar datos en espejo
        const result_insert = await this.CleardigitalizadosModel.InsertEspejo(result_Data)
        .catch((e) => res.status(401).json({
          message: "fallo InsertEspejo", 
          data
        }));
        console.log('result_insert', result_insert);

        console.log('tiene_pedidos', tiene_pedidos);
        const num_pedidos = tiene_pedidos.map(item => `'${item}'`).join(',');
        console.log('num_pedidos', num_pedidos);
        const pedidos_barcode_caja = await this.CleardigitalizadosModel.getTBpedidosPagadosModel(num_pedidos);
        console.log('pedidos_barcode_caja', pedidos_barcode_caja.length);
        let uniqueArr1 = getAll_pedidos.filter(item => 
          !pedidos_barcode_caja.some(element => 
            item.TB_PEDIDOS_BARCODE_CAJA === element.TB_PEDIDOS_BARCODE_CAJA
          )
        );
        uniqueArr1 = uniqueArr1.map((key) => key.TB_PEDIDOS_BARCODE_CAJA);
        let uniqueArr2 = pedidos_barcode_caja.filter(item =>
          !getAll_pedidos.some(element =>
            item.TB_PEDIDOS_BARCODE_CAJA === element.TB_PEDIDOS_BARCODE_CAJA
          )
        );
        uniqueArr2 = uniqueArr2.map((key) => key.TB_PEDIDOS_BARCODE_CAJA);
        const unionArr = [...uniqueArr1, ...uniqueArr2];
        console.log('pedidos que no estan en ambos lados', unionArr);
        const response_mom = await this.CleardigitalizadosModel.getPedidosPagadosVerifyMadreModel(tiene_pedidos);

        console.log({
          data_espejo: pedidos_barcode_caja.length,
          data_madre: response_mom.length,
        });
        // *compara la cantidad de datos y si son iguales borra los pedidos de la madre y actualiza los consecutivos
        if (pedidos_barcode_caja.length === response_mom.length) {
          // *elimina los pedidos de la madre
          const resEliminados = await this.CleardigitalizadosModel.deletePedidosPagadosMadreModel(tiene_pedidos);
          // *actualiza los consecutivos para indicar se eliminaron los pedidos
          const resActualizados = await this.CleardigitalizadosModel.updateAuthPagadosMomModel(tiene_pedidos);

          console.log('eliminados', resEliminados);
          console.log('actualizados', resActualizados);
          const dataResponse = {
            data,
            comprobantes_actualizados,
            comprobantes_sin_actualizar,
            result_insert,
            resEliminados,
            resActualizados,
          }
          return res.status(200).json({
            message: "proceso finalizado", 
            data: dataResponse
          });
        }
        return res.status(401).json({
          message: "no se finalizo el proceso cantidad de datos diferentes", 
          data
        });
      } else {
        return res.status(401).json({
          message: "no hay consecutivos",
          data,
        });
      }
    } else {
      return res.status(401).json({
        message: "no hay data disponible",
        data,
      });
    }
  };
}

export default CleardigitalizadosController;
