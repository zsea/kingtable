import KingTable from '../src';
layui.use(['table', 'layer', 'form', 'laypage', "jquery"], function () {
    window.$ = layui.$;
    var table = new KingTable($("#bigtable"), {
        cols: [{
            title: "人物",
            width: 150,
            field: "name",
            render: function (value, row, index) {
                return `<span style="color:red;">${value}</span>`;
            }
        }, {
            title: "民族",
            width: 150,
            field: "mz",
            render: function (value, row, index) {
                return value;
            }
        }, {
            title: "出场时间",
            width: 200,
            field: "time",
            render: function (value, row, index) {
                return index;
            }
        }, {
            title: "格言",
            field: "lng"
        }],
        rowHeight: 40,
        headerHeight: 40,
        size: 20,
        class: "layui-table"
    });
    var data = [];
    for (var i = 0; i < 100000; i++) {
        data.push({
            name: "岳飞" + i,
            mz: "汉",
            time: "2012-5-6",
            lng: null
        });
    }
    table.push(data, true);
    window.setTimeout(function () {
        table.set(0, {
            name: "曾国藩",
            mz: "汉",
            time: "1999",
            lng: "行军打仗"
        });
        console.log(table.get(0));
        console.log(table.get(1));
        console.log(table.remove(6,1));
    }, 10000)
});