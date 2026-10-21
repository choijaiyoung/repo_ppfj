'use strict';

const mongoose = require('mongoose');

/**
 * 지역
 * MySQL table: locations
 * MongoDB collection: locations
 */
const schema = new mongoose.Schema(
  {
    // 기본키(순번)
    id: { type: Number, required: true, unique: true },
    // 국가코드2자리
    country_code: { type: String, required: true, index: true },
    // 국가명
    country_name: { type: String, required: true },
    // 법정동코드
    locations_code: { type: String, index: true },
    // 시도/주 코드
    state_province_code: { type: String, index: true },
    // 시도/주 명
    state_province_name: { type: String },
    // 시군구/도시코드
    city_district_code: { type: String, index: true },
    // 시군구/도시명
    city_district_name: { type: String },
    // 읍면동 코드
    town_code: { type: String },
    // 읍면동 명
    town_name: { type: String },
    // 비고
    remark: { type: String },
    // 사용유무
    is_use: { type: Boolean, required: true, index: true },
    // 등록자
    insert_id: { type: Number, required: true },
    // 등록일자
    insert_date: { type: Date, required: true },
    // 수정자
    update_id: { type: Number, required: true },
    // 수정일자
    update_date: { type: Date },
    // 위도
    latitude: { type: Number },
    // 경도
    longitude: { type: Number },
  },
  { collection: 'locations', versionKey: false }
);

module.exports = mongoose.models.Locations || mongoose.model('Locations', schema);
