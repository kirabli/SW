<template>
  <div style="width:100%;padding: 20px 40px 0 40px;position: relative;box-sizing: border-box;">
    <h2 style="text-align: center;">{{item.printData.organName}}<span>精二</span></h2>
    <h2 style="text-align: center;">住院特殊药品处方笺</h2>
    <span>费别：{{item.printData.hospPatiTypeName}}</span>
    <hr style="margin-left:-20px;width:calc(100% + 40px)" />
    <table style="width:100%">
      <tr>
        <td style="width:25%">姓名：{{item.printData.patientName}}</td>
        <td style="width:25%">性别：{{item.printData.sex ? '男' : '女'}}</td>
        <td style="width:50%">年龄：{{item.printData.patientAge}}</td>
      </tr>
      <tr>
        <td :colspan="2">住院病案号：{{item.printData.hospPatiCode}}</td>
        <td>当前科室：{{item.printData.deptsettidEnterName}}</td>
      </tr>
      <tr>
        <td :colspan="2">临床诊断：{{item.printData.tentativeDiagnosisName}}</td>
        <td>开嘱时间：{{item.printData.orderDate}}</td>
      </tr>
      <tr>
        <td :colspan="2">住址/电话：{{(this.validatenull(item.printData.address)?'':item.printData.address)+(this.validatenotnull(item.printData.address)&&this.validatenotnull(item.printData.telephone)?'/':'')+(this.validatenull(item.printData.telephone)?'':item.printData.telephone)}}</td>
        <td>身份证号：{{item.printData.idCard}}</td>
      </tr>
    </table>
    <hr style="margin-left:-20px; width:calc(100% + 40px)" />
    <span style="margin-left: -20px; font-size: 30px; display: inline-block; vertical-align: top;}">R</span>
    <span style="font-size: 30px; margin-top: 5px; display: inline-block;">P</span>
    <div>
      <span style="width: 25%;display: inline-block;">{{item.printData.medicinesInfo.name}}</span>
      <span style="width: 25%;display: inline-block;">{{item.printData.medicinesInfo.specifications}}</span>
      <span style="width: 25%;display: inline-block;">{{ 'X ' + item.printData.totalQuantities.toFixed(2) + ' ' + item.printData.hospitalPharmacyUnitName}}</span>
      <span style="width: 25%;display: inline-block;">{{item.printData.unitPrice.toFixed(2)}}</span>
    </div>
    <div>
      <span style="width: 15%;display: inline-block;">{{item.printData.usage}}</span>
      <span style="width: 35%;display: inline-block;">{{item.printData.frequency}}</span>
      <span style="width: 25%;display: inline-block;">{{item.printData.doctorAdvice}}</span>
    </div>
    <div style="margin-top: 150px;">
      <img style="width:60px" v-if="validatenotnull(item.printData.sendDoctorCaImagePathUrl)" border='0' :src='item.printData.sendDoctorCaImagePathUrl' />
      <span v-else style="width: 65%;display: inline-block;">{{"开嘱医师：" + item.printData.doctorName}}</span>
      <span style="width: 30%;display: inline-block;">{{"总费用：" + item.printData.money.toFixed(2)}}</span>
    </div>
    <div>
      <span>{{"复核护士：" + item.printData.money.toFixed(2)}}</span>
    </div>
    <div style="width: calc(100% + 40px); margin-left: -20px;position: relative; ">
      <div style="position: absolute;height: 100%;width: 1px;z-index: 9999;background-color: white;"></div>
      <div style="position: absolute;height: 100%;width: 1px;z-index: 9999;background-color: white;right: 0;"></div>
      <table border="1" style="border-collapse: collapse;width: 100%;">
        <tr>
          <td style="padding-left:20px;">价目</td>
          <td style="padding-left:20px">审核：</td>
          <td style="padding-left:20px;">核对：</td>
        </tr>
        <tr>
          <td style=""></td>
          <td style="padding-left:20px">调配：</td>
          <td style="padding-left:20px;">发药：</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MBox from '@/components/MBox'
export default {
  name: 'Prescription',
  components: {
    MBox
  },
  data() {
    return {
      item: { "printData": { "organName": "潜江市高石碑镇卫生院", "orderDate": "2024-01-25 14:54:49", "doctorName": "王为安", "doctorAdvice": "", "unitPrice": 35, "totalQuantities": 3, "hospitalPharmacyUnitName": "片", "money": 35, "queryFormStatus": 3, "queryFormType": 3, "queryFormStartTime": "", "queryFormEndTime": "", "hospPatiRegId": "9426b5c342b754d8808aca1fe85f704b", "hospPatiCode": "24012404", "hospPatiType": "e0e604b4bfffb270a9c2a0b590fd3eb9", "hospPatiTypeName": "自费", "patientName": "scyh", "patientAge": "11岁", "sex": 1, "bedNumber": "80", "nursingManagemennt": "", "managementName": "", "managementCode": "", "status": 3, "physicianInCharge": "吕纯瑶", "cartevtalNumber": "", "deptEnterDate": "", "deptsettidEnter": "19c74abb20b34bbd9a81fa35fc64cd32", "deptsettidEnterName": "公卫科", "deptsettidCurrent": "19c74abb20b34bbd9a81fa35fc64cd32", "telephone": "", "regDate": "2024-01-24 15:27", "dischargeTime": "", "dischargedPersonnel": "", "je": 0, "patientArchivalInfoId": "8c2788412003c21b8f6aaca019400cc0", "hospitalDay": 2, "deptOutDate": "", "address": "", "bedsSettingId": "ea1f496b113f9fbe64c02ccd76cb84a1", "wardmanaid": "c53932e7ad0c8ca0ffaac94cfcbde8a5", "personnelName": "", "idCard": "", "createOperator": "9fadf70d58b48f594041b5d135406198", "createOperatorName": "王为安", "noVerifySign": false, "unexecuteSign": false, "doctorStopAdviceSign": false, "hisMedInsuraStaffRecWh": "", "hisMedInsuraStaffRecQj": "", "bascbz": "", "jsdscbz": "", "settlementTime": "", "jzlb": "", "statusMtb": "", "jbStatus": "", "tentativeDiagnosis": "Z00.001", "tentativeDiagnosisName": "健康查体", "hisHospRegistDiagnosisList": [{ "hospRecePatiDiagId": "5ea0adf18442113adcac4f81a2eaea16", "hospPatiRegId": "9426b5c342b754d8808aca1fe85f704b", "diagnosticCoding": "BNP010", "diagnosticContent": "胃脘痛病", "diagnosticType": 1, "stopSign": 0, "mainSign": 1, "admissionDischargeSign": 0, "remarks": null, "receivePatiSympTypeId": null, "sympTypeCoding": null, "sympTypeContent": null, "syndromeStopSign": null, "syndromeDiagnosticType": null, "syndromeRemark": null, "diseaseSignCode": null, "seq": 1, "admissionCondition": null, "hospitalDischarge": null }, { "hospRecePatiDiagId": "c99f304524e9f7759966c706016b7c2b", "hospPatiRegId": "9426b5c342b754d8808aca1fe85f704b", "diagnosticCoding": "Z00.001", "diagnosticContent": "健康查体", "diagnosticType": 0, "stopSign": 0, "mainSign": 1, "admissionDischargeSign": 1, "remarks": "入院登记新增", "receivePatiSympTypeId": null, "sympTypeCoding": null, "sympTypeContent": null, "syndromeStopSign": null, "syndromeDiagnosticType": null, "syndromeRemark": null, "diseaseSignCode": null, "seq": 1, "admissionCondition": null, "hospitalDischarge": null }], "hisHospSurgeryRegisterVOList": "", "isArrears": true, "total": "", "hospSkinTestVOList": "", "hospFinancialPaymentsId": "", "zfStatus": "", "wardEnterName": "", "wardOutName": "", "pathwayArrangeId": "", "cpStatus": "", "transferFlag": "0", "newDept": "", "_XID": "row_21", "medicinesInfo": { "hisMedicineId": "09042db6fbda8cfb5d42f0c8bc22f24e", "hisMedicineDicId": "AA4B9E4856F08299E0530100007F566C", "code": "XN05CDA087A001010401884", "name": "艾司唑仑片", "nameAs": "艾司唑仑片", "inciName": "", "englishName": "", "commonName": "", "dosage": "1", "dosageUnit": "b513ddd08f946910058b53c881b599c9", "dosageForms": "A9EAC53C57D16648E0530100007FD7C0", "specifications": "1mgx150片/盒", "typeDicId": "06668ac2f8fb41e47ecc314ff9402cb2", "syllablesCode": "ASZLP", "fivestrokesCode": "", "hisManufacturerId": "AA5343BE49B8A647E0530100007FA4E1", "medicalPropId": "", "drugUnit": "54ac802b7d139577ae5074238e25a014", "clinicUnit": "b513ddd08f946910058b53c881b599c9", "hospitalUnit": "b513ddd08f946910058b53c881b599c9", "pediatricUnit": "", "categories": "06668ac2f8fb41e47ecc314ff9402cb2", "executeCategories": "00699ad71f1f675c6e6bca9d71c8ddfd", "baseMedicineFlag": 0, "specialMedicineFlag": 0, "dangerousMedicineFlag": 0, "freeMedicineFlag": 1, "barcode": "", "checkComputationFlag": 0, "antibioticGrade": 1, "toxicMedicineFlag": 1, "permittedModifyFlag": 1, "status": 1, "sysOrganizationId": "1001005", "directions": "", "remarks": "", "createBy": "A9FB2CFFF152F2FBE0530100007FF973", "createTime": "2020-07-19 17:25:57", "lastUpdateBy": "AC0AC09392CE8198E050007F0100FF1B", "lastUpdateTime": "2023-09-21 14:41:00", "delFlag": 0, "minimumUse": "1", "minimumUseUnit": "b513ddd08f946910058b53c881b599c9", "clinicPharmacyUnit": "b513ddd08f946910058b53c881b599c9", "clinicPharmacyCoefficient": "1", "hospitalPharmacyUnit": "b513ddd08f946910058b53c881b599c9", "hospitalPharmacyCoefficient": "1", "specialMedicine": "", "drugSupervisionCode": "", "spiritualSigns": "1", "spiritGrade": 3, "approvalNumber": "国药准字H42021522", "approvalDate": "", "serialNumber": "", "hangingNetType": "", "packingUnit": "bf2eb49b06b54ad7dda4725aff8da5c0", "usage": "AA046D9FB4AF674AE0530100007F7693", "frequency": "", "skinTest": 0, "downloadTime": "2020-07-19 17:25:57", "wholesalePrice": "", "retailPrice": 35, "enterPrice": 35, "upperPrice": "", "lowerPrice": "", "dragCoefficient": 150, "clinicCoefficient": 1, "hospitalCoefficient": 1, "pediatricCoefficient": "", "ddd": 0, "sellPiece": 0, "sellPieceCoefficient": "", "ybcode": 0, "ydybcode": 0, "hisMedMatClinicsTjSetList": "", "clinicDddCoefficient": 0, "hospitalDddCoefficient": 0, "skinTestValidDate": 0, "enableMedValidityDate": 1, "maxLimitNum": "", "medicineType": 1, "pMedicinalDetailId": "" }, "usage": "口服", "frequency": "8小时1次" } }
    }
  },
  computed: {
  },
  methods: {

  },
}
</script>
