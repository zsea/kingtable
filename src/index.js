function KingTable(container, settings) {
  const maxHeight = settings.size * settings.rowHeight + settings.headerHeight;
  var fullHeight = 0;
  var grade = $("<div />").css("overflow", "auto").height(maxHeight);
  var full = $("<div />").css("position", "relative").height(fullHeight);
  var parent = $("<div />").css("position", "absolute").css({
    top: 0,
    left: 0,
    right: 0
  }).height(maxHeight);
  var table = $("<table />").css("margin-top", 0);
  if (settings.class) {
    table.addClass(settings.class);
  }
  if (settings.props) {
    for (var attr in settings.props) {
      table.attr(attr, settings.props[attr]);
    }
  }
  var colgroup = $("<colgroup />"), thread = $("<thead />"), tr = $("<tr />");
  thread.append(tr);
  settings.cols.forEach(function (col) {
    var $col = $("<col />");
    if (col.width !== null && col.width !== undefined) {
      $col.attr("width", col.width);
    }
    colgroup.append($col);

    var th = $("<th />").html(col.title);
    tr.append(th)
  });
  var tbody = $("<tbody />");

  //开始组装并显示
  grade.append(full);
  full.append(parent);
  parent.append(table);
  table.append(colgroup);
  table.append(thread);
  table.append(tbody);

  container.append(grade);

  var datas = [], doms = [];
  var prev_top = 0, prev_pos = 0, direction = "";
  function Show() {
    var is_bottom = grade.prop('scrollHeight') - grade.scrollTop() === grade.height();
    var top = grade.scrollTop();
    if (top > prev_top) {
      direction = "down"
    }
    else if (top < prev_top) {
      direction = "up"
    }
    else {
      direction = "";
    }
    var last_top = (datas.length - settings.size) * settings.rowHeight;
    var pos = parseInt(top / settings.rowHeight);
    if (pos > datas.length - settings.size) {
      pos = datas.length - settings.size;
    }
    if (direction == "down" && pos <= prev_pos) {
      //pos = datas.length - settings.size;
      if (pos + 1 + settings.size <= datas.length) {
        pos = pos + 1;
      }
    }
    if (is_bottom) {
      pos = datas.length - settings.size;
    }
    if (pos < 0) {
      pos = 0;
    }
    else if (pos > datas.length - settings.size) {
      pos = datas.length - settings.size;
      parent.css("top", top);
      prev_top = top;
    }
    else {
      parent.css("top", top);
      prev_top = top;
    }

    prev_pos = pos;
    for (var i = 0; i < settings.size && i < datas.length; i++) {
      var new_row = i >= doms.length, cels;
      var row = null;
      if (new_row) {
        row = $("<tr />");
        cels = [];
      }
      else {
        cels = doms[i];
      }
      for (var j = 0; j < settings.cols.length; j++) {
        var cel = new_row ? $("<td />") : cels[j];
        var cel_value = datas[pos + i][settings.cols[j].field];
        if (settings.cols[j].render) {
          cel_value = settings.cols[j].render(cel_value, datas[pos + i], pos + i);
        }
        if (cel_value === null || cel_value === undefined) {
          cel_value = "";
        }
        cel.html(cel_value);
        if (new_row) {
          cels.push(cel);
          row.append(cel);
        }
      }
      if (new_row) {
        doms.push(cels);
        tbody.append(row);
      }
    }
  }
  grade.scroll(Show);
  this.__defineGetter__("push", function () {
    return function (item, isBatch) {
      if (!isBatch) {
        datas.push(item);
      }
      else {
        item.forEach(function (i) {
          datas.push(i);
        });
      }
      fullHeight = datas.length * settings.rowHeight;
      full.height(fullHeight);
      Show();
    }
  });
  this.__defineGetter__("set", function () {
    return function (index, item) {
      if (index >= datas.length) {
        this.push(item);
      }
      else {
        datas[index] = item;
        Show();
      }
    }
  });
  this.__defineGetter__("get", function () {
    return function (index) {
      return datas[index]
    }
  });
  this.__defineGetter__("length", function () {
    return datas.length;
  });
  this.__defineGetter__("remove", function () {
    return function (index, howmany) {
      var items = datas.splice(index, howmany);
      fullHeight = datas.length * settings.rowHeight;
      full.height(fullHeight);
      Show();
      return items;
    }
  })
}
if (window) {
  window.KingTable = KingTable;
}
export default KingTable;