**1.留存**
# 留存
> 留存包括6个部分：活跃用户留存、新增用户留存、付费用户留存、活跃设备留存、新增设备留存、付费设备留存。所有留存数据都通过一个接口获取，通过请求参数type字段来区分。

## URL
> [http:// 192.168.10.111:8080/app/userAnalysis/selectRetentionStatistics .do?](http://dataviewer.ilongyuan.com.cn/app/userAnalysis/selectRetentionStatistics.do)

## 支持格式
> JSON

## HTTP请求方式
> POST

## 请求参数
> |参数|必选|类型|说明|
|:-----  |:-------|:-----|-----                               |
|appId    |ture    |String(32)|游戏Id                          |
|platform    |true    |String(32)   |平台 |
|type    |true    |String(32)   |类型字段：1-新增用户留存 2-活跃用户留存 3-付费用户留存4-新增设备留存5-活跃设备留存6-付费设备留存 |
## 返回字段
> |返回字段|示例|说明                              |
|:-----   |:------|:-----------------------------   |
|dt   |2017-02-16    |日期  |
|num  |0.2335233 | 数量：如果type = 1,则表示当日新增用户数量，如果type=1,则表示活跃用户数量,以此类推|
|retentionNum1Day |0.2335233 |1日留存                         |
|retentionNum2Day |0.2335233 |2日留存   
|retentionNum3Day |0.2335233 |3日留存   
|retentionNum4Day |0.2335233 |4日留存   
|retentionNum5Day |0.2335233 |5日留存   
|retentionNum6Day |0.2335233 |6日留存   
|retentionNum7Day |0.2335233 |7日留存   
|retentionNum15Day |0.2335233 |15日留存   
|retentionNum30Day |0.2335233 |30日留存                     |

## 接口示例
> 地址：[ttp://test.dataviewer.ilongyuan.com.cn/app/userAnalysis/selectRetentionStatistics.do?type=1&page=0&pageSize=10&appId=289ee05803487e57&platform=1&startDate=&endDate=](http://dataviewer.ilongyuan.com.cn/app/userAnalysis/selectRetentionStatistics.do)
``` javascript
{
    {
    "channelMap": {
        "longyuan5": "longyuan5",
        "jinritt": "jinritt",
        "uctt": "uctt"
       .......
    },
    "total": 130,
    "code": 0,
    "data": [
        {
            "dt": 1489161600000,
            "retentionNum5Day": 0,
            "retentionNum30Day": 0,
            "num": 37733,
            "retentionNum15Day": 0,
            "retentionNum2Day": 0,
            "retentionNum7Day": 0,
            "retentionNum1Day": 0,
            "retentionNum6Day": 0,
            "retentionNum3Day": 0,
            "retentionNum4Day": 0
        }
    ]
}
}
``` 