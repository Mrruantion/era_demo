/**
 * 应用数据库定义，每做一个更改必须更改版本号
 */
let version = 6;//版本号

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
        }, {
            'name': 'product_price',
            'desc': '产品定价',
            'type': 'Array',
            'display': 'TextBox',
            'query': true,    //可查询字段
        }, {
            'name': 'declare',
            'desc': '服务说明',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
        }, {
            'name': 'sex',
            'desc': '性别',
            'type': 'Number',
            'display': 'TextBox',
            'query': true    //可查询字段
        }
    ],
    indexDefine: [
        {
            uid: 1,
            unique: true
        },
    ]
}
//员工表
export const employee = {
    name: 'employee',             //表名
    desc: '人员表',             //表描述
    type: 1,             //类型(0:基础表, 1:用户表)
    isApi: true,           //是否开放API
    isPrivate: false,       //是否隐私数据, 如果是调用API时需要访问令牌
    isCache: true,         //数据是否启用缓存
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
            'name': 'companyId',
            'desc': '公司id',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
            'validations': {
                required: true
            },
            'messages': {
                required: '公司id为必填'
            }
        },
        {
            'name': 'isQuit',
            'desc': '是否离职',
            'type': 'Boolean',
            'query': true    //可查询字段
        },
        {
            'name': 'quitDate',
            'desc': '离职时间',
            'type': 'Date',
            'query': true    //可查询字段
        },
        {
            'name': 'name',
            'desc': '姓名',
            'type': 'String',
            'display': 'TextBox',
            'query': true,    //可查询字段
            'validations': {
                required: true
            },
            'messages': {
                required: '姓名为必填'
            }
        },
        {
            'name': 'sex',
            'desc': '性别',
            'type': 'Number',
            'display': 'TextBox',
            'query': true    //可查询字段
        },
        {
            'name': 'idcard',
            'desc': '身份证',
            'type': 'String',
            'display': 'TextBox',
            'query': true    //可查询字段
        },
        {
            'name': 'tel',
            'desc': '电话',
            'type': 'String',
            'display': 'TextBox',
            'query': true    //可查询字段
        },
        {
            'name': 'email',
            'desc': '邮箱',
            'type': 'String',
            'display': 'TextBox',
            'query': true    //可查询字段
        },
        {
            'name': 'wechat',
            'desc': '微信号',
            'type': 'String',
            'display': 'TextBox',
            'query': true    //可查询字段
        },
        {
            'name': 'type',
            'desc': '人员类型（0默认，1编外人员，如兼职营销）',
            'type': 'Number',
            'query': true,
        }
    ],
    indexDefine: [
        {
            uid: 1,
            unique: true
        },
        { idcard: 1 },
        { tel: 1 },
        { wechat: 1 },
        { email: 1 },
    ]
}

//二维码与活动映射表
export const qrLink = {
    name: 'qrLink',             //表名
    desc: '二维码与活动映射表',             //表描述
    type: 1,             //类型(0:基础表, 1:用户表)
    isApi: true,           //是否开放API
    isPrivate: true,       //是否隐私数据, 如果是调用API时需要访问令牌
    isCache: true,         //数据是否启用缓存
    isUpdate: false,      //是否更新数据表
    cacheField: 'updatedAt',       //缓存日期字段
    fieldDefine: [
        {
            'name': 'id',
            'desc': '二维码id',
            'type': 'String',
            'query': true,
        }, {
            'name': 'url',
            'desc': '分享链接',
            'type': 'String',
            'query': true,
        }, {
            'name': 'sellerId',
            'desc': '营销人员id',
            'type': 'String',
            'query': true,
        }, {
            'name': 'act',
            'desc': '活动id',
            'type': 'String',
            'query': true,
        }, {
            'name': 'i',
            'desc': '数据id',
            'type': 'Number',
            'default': '@AutoInc',
            'query': true,
        }, {
            'name': 'type',
            'desc': '类型',//0普通短链接，1营销资料，2移车卡，3活动分享链接，4渠道注册链接，5人员注册链接
            'type': 'Number',//同一个批次的二维码type相同
            'query': true,
        }, {
            'name': 'batchId',
            'desc': '批次id',
            'type': 'String',
            'query': true
        }, {
            'name': 'batchName',
            'desc': '批次名称',
            'type': 'String',
            'query': true
        }, {
            'name': 'status',//已绑定为1，未绑定为0，方便统计
            'desc': '状态',//统计用
            'type': 'Number',
            'query': true
        }, {
            'name': 'uid',
            'desc': '所属客户',//当前用户所属公司ID
            'type': 'String',
            'query': true
        }
    ],
    indexDefine: [
        { uid: 1 }
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
