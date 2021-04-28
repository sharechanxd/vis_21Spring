
function chart({years,months,month_max_min}={})
 {
    // const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
    var margin = {top:50, right:100, bottom:50, left:80},
           totalWidth = 1000,
           totalHeight = 560,
           width = totalWidth - margin.left - margin.right,
           height = totalHeight - margin.top - margin.bottom,
           grid_size = 30;
    var svg = d3.select("#chart").append("svg")
                .attr("width", totalWidth)
                .attr("height", totalHeight)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("#chart")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
    var x_scale = d3.scaleBand()
        .domain(years)
        .range([0, width]);
    var y_scale = d3.scaleBand()
        .domain(months)
        .range([0, height]);
    var xAxis = d3.axisTop(x_scale);
    var yAxis = d3.axisLeft(y_scale);
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    grids = svg.append("g")
      .selectAll("grid")
      .data(month_max_min)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x_scale(d.year) + 5;} )
        .attr("y", function(d) { return y_scale(d.month) + 5;} )
        .attr("height", grid_size)
        .attr("width", grid_size)
        .style("fill", function(d){ if(d.month_max > 0)
            return color_scale(d.month_max);
          else
            return "transparent"})
            .on("mouseover", function(d){ tooltip.text("Date: " + d.month + " " + d.year + ", Max: " + Math.round(d.month_max) + ", Min: " + Math.round(d.month_min)); 
              return tooltip.style("visibility", "visible"); })
            .on("mousemove", function(){ return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left",(d3.event.pageX + 10) + "px"); })
            .on("mouseout", function(){ return tooltip.style("visibility", "hidden"); });

    return grids;
    }

