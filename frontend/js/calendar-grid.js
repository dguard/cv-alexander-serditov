
(function(){
  window.drawGrid = (gridId, headerRow, firstColumn, data) => {
    const cellWidth = 15
    const cellHeight = 15

    let filledSize = 0
    headerRow = [headerRow.map((col, columnIndex) => {
      const res = {
        x: filledSize*cellWidth,
        y: 0,
        size: col.size,
        width: col.size*cellWidth,
        height: cellWidth,
      }
      filledSize += col.size
      return res
    })]

    function gridData() {
      let click = 0
      return firstColumn.map((item, rowIndex) => {
        return [{
          x: 0,
          y: rowIndex*cellWidth,
          width: 2*cellWidth,
          height: cellWidth,
          click: click,
          ...item
        }]
      }).concat(data.map((row, rowIndex) => {
        return row.map((col, columnIndex) => {
          return {
            x: 2*cellWidth+columnIndex*cellWidth,
            y: cellWidth+rowIndex*cellWidth,
            width: cellWidth,
            height: cellWidth,
            click: click,
            ...col
          }
        })
      }))
    }
    var gridData = gridData();

    var grid = d3.select(gridId)
      .append("svg")
      .attr("width",`${headerRow[0].reduce((prev, curr) => {
        return prev + curr.size
      }, 0)*cellWidth}px`)
      .attr("height",`${gridData.length*cellWidth}px`);

    var row = grid.selectAll(".row")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row");

    const header = grid.selectAll('.header').insert("div",":first-child")
      .data(headerRow)
      .enter().append("g")
      .attr("class", "header");

    var cell = row.selectAll('.square')
      .data(function (d) {return d})
      .enter().append('g')
      .attr('class', 'square')
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function (d){ return d.selected ? '#2C93E8' : '#fff'})
      .style("stroke", "#222")
      .style("stroke-width", "0.2px");

    var column = cell.select('.rect')
      .data(function (d) {return d})
      .enter().append('rect')
      .attr('class', 'rect')
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function (d){ return '#fff'})
      .style("stroke", "#222")
      .style("stroke-width", "0.2px")
      .on("mouseover", function (d) {
        d3.select(this).style("fill", '#F56C4E');
      }).on("mouseout", function (d) {
        d3.select(this).style("fill", '#fff');
      })

    var column = cell.select('.rect')
      .data(function (d) {return d})
      .enter().append('rect')
      .attr('class', 'rect')
      .attr("x", function(d) { return d.x + 5; })
      .attr("y", function(d) { return d.y + 5; })
      .attr("width", function(d) { return d.width -10; })
      .attr("height", function(d) { return d.height -10; })
      .style("fill", function (d){ return d.selected ? '#2C93E8' : '#fff'})
      .style("stroke", function (d) {
        return d.selected ? "#222" : '#fff'
      })
      .style("stroke-width", function (d) {
        return d.selected ? "0.2px" : '#fff'
      })
      .on("mouseover", function (d) {
        d3.select(this).style("fill", '#F56C4E');
      }).on("mouseout", function (d) {
        d3.select(this).style("fill", d.selected ? '#2C93E8' : '#fff');
      })

    cell.select('.text')
      .data(function (d)  {return d })
      .enter().append('text')
      .attr("x", function(d) { return d.x+(cellWidth/3); })
      .attr("y", function(d) { return d.y+(cellWidth/2); })
      .attr("dy", ".1em")
      .attr('class', 'text')
      .attr('width', 100)
      .attr('height', 50)
      .text(function (d) {
        return d.text ? d.text : ''
      })

    var headerRect = header.selectAll('.rect')
      .data(function (d) {return d})
      .enter().append('rect')
      .attr('class', 'rect')
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function (d){ return d.selected ? '#2C93E8' : '#fff'})
      .style("stroke", "#222")
      .style("stroke-width", "0.2px")
      .on("mouseover", function (d) {
        d3.select(this).style("fill", '#F56C4E');
      }).on("mouseout", function (d) {
        d3.select(this).style("fill", '#fff');
      })

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let monthCounter = 0
    const getMonth = () => {
      const res = months[monthCounter]
      monthCounter++
      return res
    }
    let counter = 0
    const getCounter = () => {
      const res = counter
      counter++

      return res
    }

    const titles = grid.selectAll('.titles').data([{0: 1}]).enter().append('g').attr('class', 'titles')

    var monthsTitles = titles.selectAll('.text')
      .data(headerRow[0])
      .enter().append('text')
      .attr('class', 'text')
      .attr("x", function(d) { return d.x+10; })
      .attr("y", function(d) { return d.y+9; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("dy", ".1em")
      .style("fill", function (d){ return '#000'})
      .text(function (d){
        if(getCounter() === 0) return ''
        return getMonth()
      })
  }
})()