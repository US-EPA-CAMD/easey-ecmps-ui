-- View: camddmw.vw_annual_unit_data

-- DROP VIEW camddmw.vw_annual_unit_data;

CREATE OR REPLACE VIEW camddmw.vw_annual_unit_data
 AS
 SELECT uf.state,
    uf.facility_name,
    uf.orispl_code,
    uf.unit_id,
    uf.unitid,
    uf.assoc_stacks,
    aud.op_year,
    aud.sum_op_time,
    aud.count_op_time,
    aud.gload,
    aud.sload,
    aud.so2_mass,
    aud.so2_rate,
    aud.co2_mass,
    aud.co2_rate,
    aud.nox_mass,
    aud.nox_rate,
    aud.heat_input,
    uf.primary_fuel_info,
    uf.secondary_fuel_info,
    uf.unit_type_info,
    uf.so2_control_info,
    uf.nox_control_info,
    uf.part_control_info,
    uf.hg_control_info,
    uf.prg_code_info,
    aud.userid,
    aud.add_date
   FROM camddmw.annual_unit_data aud
     JOIN camddmw.unit_fact uf ON aud.unit_id = uf.unit_id AND aud.op_year = uf.op_year
     JOIN camddmw.op_year oy ON aud.op_year = oy.op_year AND oy.archive_ind = 0::numeric
UNION ALL
 SELECT uf.state,
    uf.facility_name,
    uf.orispl_code,
    uf.unit_id,
    uf.unitid,
    uf.assoc_stacks,
    aud.op_year,
    aud.sum_op_time,
    aud.count_op_time,
    aud.gload,
    aud.sload,
    aud.so2_mass,
    aud.so2_rate,
    aud.co2_mass,
    aud.co2_rate,
    aud.nox_mass,
    aud.nox_rate,
    aud.heat_input,
    uf.primary_fuel_info,
    uf.secondary_fuel_info,
    uf.unit_type_info,
    uf.so2_control_info,
    uf.nox_control_info,
    uf.part_control_info,
    uf.hg_control_info,
    uf.prg_code_info,
    aud.userid,
    aud.add_date
   FROM camddmw_arch.annual_unit_data_a aud
     JOIN camddmw.unit_fact uf ON aud.unit_id = uf.unit_id AND aud.op_year = uf.op_year
     JOIN camddmw.op_year oy ON aud.op_year = oy.op_year AND oy.archive_ind = 1::numeric;

