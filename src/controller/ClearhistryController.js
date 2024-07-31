import ClearhistryModel from "../model/ClearhistryModel.js";
class ClearhistryController {
  constructor() {
    this.ClearhistryModel = new ClearhistryModel();
  }

  getClearhistryController = async (req, res) => {
    try {
      const data = await this.ClearhistryModel.getpedidosNumeracionPagadosModel()
      .catch((e) => res.status(401).json({message: "fallo getpedidosNumeracionPagadosModel"}));

      if (data) {
        const response_consecutivos = data.map((consecutivos) => consecutivos.CONSECUTIVO);
        const tiene_pedidos = [];
        const comprobantes_actualizados = [];
        const comprobantes_sin_actualizar = [];
        for (const element of response_consecutivos) {
          const result_getpedidos = await this.ClearhistryModel.getTBpedidosPagadosModel(element)
          .catch((e) => res.status(401).json({message: "fallo getTBpedidosPagadosModel"}));

          if (result_getpedidos.length === 0) {
            console.log({ "no tiene pedidos ": element });
            await this.ClearhistryModel.updateEmptyAuthPagadosMomModel(element)
              .then((res) => comprobantes_actualizados.push(element))
              .catch((e) => comprobantes_sin_actualizar.push(element));
          } else {
            tiene_pedidos.push(element);
          }
        }

        const getAll_pedidos = await this.ClearhistryModel.getAllPedidosPagadosMadreModel(tiene_pedidos);

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
        const resultInsert = await this.ClearhistryModel.InsertEspejo(result_Data).catch((e) =>
          console.log({ "fallo el insert ": e })
        );

        const response_espejo = await this.ClearhistryModel.getTBpedidosPagadosModel(tiene_pedidos);
        const response_mom = await this.ClearhistryModel.getPedidosPagadosVerifyMadreModel(tiene_pedidos);
        
        console.log({
          data_espejo: response_espejo.length,
          data_madre: response_mom.length,
        });
        if (response_espejo.length === response_mom.length) {
          const resEliminados = await this.ClearhistryModel.deletePedidosPagadosMadreModel(tiene_pedidos);
          const resActualizados = await this.ClearhistryModel.updateAuthPagadosMomModel(tiene_pedidos);

          const dataResponse = {
            comprobantes_actualizados,
            comprobantes_sin_actualizar,
            resultInsert,
            resEliminados,
            resActualizados,
          }
          return res.status(200).json({ message: "proceso finalizado", dataResponse });
        }
        return res.status(401).json({ message: "no se finalizo el proceso cantidad de datos diferentes" });
      }
      return res.status(401).json({ message: "no hay data disponible" });
    } catch (error) {
      return res.status(401).json({ message: "Ocurrrio un error " + error });
    }
  };
}

export default ClearhistryController;
