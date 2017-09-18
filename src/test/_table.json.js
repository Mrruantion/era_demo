/**
 * 应用数据库定义，每做一个更改必须更改版本号
 */
let version = 2;//版本号

//地区表
// export const area={
//     name: 'area',             //表名
//     desc: '地区字典表',             //表描述
//     type: 1,             //类型(0:基础表, 1:用户表)
//     isApi: true,           //是否开放API
//     isPrivate: false,       //是否隐私数据, 如果是调用API时需要访问令牌
//     isCache: true,         //数据是否启用缓存
//     cacheField: 'updatedAt',       //缓存日期字段
//     fieldDefine: [
//         {
//             'name': 'id',
//             'desc': '索引id',
//             'type': 'Number',
//             'display': 'TextBox',
//             'primary': true,  //主键字段
//             'query': true,    //可查询字段
//             'validations': {
//                 required:true
//             },
//             'messages': {
//                 required:'id为必填'
//             }
//         },{
//             'name': 'name',
//             'desc': '地区名称',
//             'type': 'String',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//             'validations': {
//                 required:true
//             },
//             'messages': {
//                 required:'地区名称为必填'
//             }
//         },{
//             'name': 'parentId',
//             'desc': '上级地区id',
//             'type': 'Number',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//             'validations': {
//                 required:true
//             },
//             'messages': {
//                 required:'上级地区id为必填，顶级填1'
//             }
//         },{
//             'name': 'level',
//             'desc': '地区级别',
//             'type': 'Number',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//             'validations': {
//                 required:true
//             },
//             'messages': {
//                 required:'地区级别为必填'
//             }
//         },{
//             'name': 'areaCode',
//             'desc': '区号',
//             'type': 'String',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//         },{
//             'name': 'zipCode',
//             'desc': '邮政编码',
//             'type': 'String',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//         },{
//             'name': 'provinceId',
//             'desc': '所属省级id',
//             'type': 'Number',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//         },{
//             'name': 'provinceName',
//             'desc': '所属省级名称',
//             'type': 'String',
//             'display': 'TextBox',
//             'query': true,    //可查询字段
//         }
//     ],
//     indexDefine: [
//         {
//             id:1,
//             unique:true
//         },
//         {name:1},
//         {parentId:1},
//         {level:1}
//     ]
// }
export const customer = {
    name: 'customer',             //表名
    desc: '客户表',             //表描述
    type: 1,             //类型(0:基础表, 1:用户表)
    isApi: true,           //是否开放API
    isPrivate: false,       //是否隐私数据, 如果是调用API时需要访问令牌
    isCache: true,         //数据是否启用缓存
    isUpdate: true,      //是否更新数据表
    cacheField: 'updatedAt',       //缓存日期字段
    fieldDefine: [
        {
            'name': 'uid',
            'desc': '用户id',
            'type': 'String',
            'display': 'TextBox',
            'primary': true,  //主键字段
            'query': true,    //可查询字段
            'validations': {
                required: true
            },
            'messages': {
                required: '用户id为必填'
            }
        },
        {
            'name': 'name',
            'desc': '公司或客户名称',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
            'validations': {
                required: true
            },
            'messages': {
                required: '名称为必填'
            }
        },
        {
            'name': 'tel',
            'desc': '联系电话',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
            'validations': {
                required: true
            },
            'messages': {
                required: '联系电话为必填'
            }
        },
        {
            'name': 'loc',
            'desc': '坐标经纬度',
            'type': 'Object',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'custTypeId',
            'desc': '用户类型',
            'type': 'Number',
            'query': true
        },
        {
            'name': 'custType',
            'desc': '用户类型名称',
            'type': 'String',
            'query': true
        },
        {
            'name': 'province',
            'desc': '省份名称',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'provinceId',
            'desc': '省份id',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'city',
            'desc': '城市名称',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'cityId',
            'desc': '城市id',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'area',
            'desc': '行政区名称',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'areaId',
            'desc': '行政区id',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'address',
            'desc': '详细地址',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
        {
            'name': 'contact',
            'desc': '联系人名称',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        }, {
            'name': 'YyzzPhoto',
            'desc': '营业执照',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        }, {
            'name': 'StorePhoto',
            'desc': '网点图片',
            'type': 'Array',
            'display': 'TextBox',
            'query': true,    //可查询字段
        }, {
            'name': 'TypeName',
            'desc': '门店性质',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        },
    ],
    indexDefine: [
        {
            uid: 1,
            unique: true
        },
    ]
}

// let TABLES=[
//     area,customer,custType,department,employee,vehicle,iotDevice,iotGpsData,iotLog
//     ,brand,product,deviceTotal,deviceLog,iotStat,iotCommand,iotAlert,booking,activity,
//     weixin,qrData,activityProduct,qrDistribution,qrLink,authorize,promotion
// ];
let TABLES = [
    customer
]
let old_vareion = localStorage.getItem('table.json.js.version');
localStorage.setItem('table.json.js.version', version);
window._fields = {};
TABLES.forEach(t => {
    _fields[t.name] = t.fieldDefine.map(f => f.name).join(',') + ',objectId,createdAt,updatedAt,creator';
});
if (version == old_vareion) {
    TABLES = [];
}

export default TABLES;
