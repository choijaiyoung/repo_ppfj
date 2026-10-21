'use strict';

// 모든 스키마를 등록한다.
module.exports = {
  Locations: require('./locations'),
  ManagedDivision: require('./managed_division'),
  Model: require('./model'),
  ModelCategory: require('./model_category'),
  ModelSub: require('./model_sub'),
  ModelType: require('./model_type'),
  Product: require('./product'),
  ProductDetail: require('./product_detail'),
  ProductGroup: require('./product_group'),
  ProductOperationStatusLog: require('./product_operation_status_log'),
};
