
function chart({years,months,month_max_min,data}={})
{
    var margin = {top:50, right:100, bottom:0, left:80},
            totalWidth = 1600,
            totalHeight = 800,
            width = totalWidth - margin.left - margin.right,
            height = totalHeight - margin.top - margin.bottom,
            grid_size = {width: 100, height: 50};
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
        .range([0, width - grid_size.width]);
    var y_scale = d3.scaleBand()
        .domain(months)
        .range([0, height - grid_size.height]);
    var xAxis = d3.axisTop(x_scale);
    var yAxis = d3.axisLeft(y_scale);
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    grids = svg.append("g")
        .selectAll("grid")
        .data(month_max_min)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x_scale(d.year) + 15;} )
        .attr("y", function(d) { return y_scale(d.month) + 5;} )
        .attr("height", grid_size.height)
        .attr("width", grid_size.width)
        .style("fill", function(d){ if(d.month_max > 0)
            return color_scale(d.month_max);
            else
            return "transparent"})
            .on("mouseover", function(d){ tooltip.text("Date: " + d.month + " " + d.year + ", Max: " + Math.round(d.month_max) + ", Min: " + Math.round(d.month_min)); 
                return tooltip.style("visibility", "visible"); })
            .on("mousemove", function(){ return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left",(d3.event.pageX + 10) + "px"); })
            .on("mouseout", function(){ return tooltip.style("visibility", "hidden"); });
        
    var line_x_scale = d3.scalePoint()
        .domain(d3.range(1, 32))
        .range([0, grid_size.width]);
    var line_y_scale = d3.scaleLinear()
        .domain([d3.min(data, function(d){ return d.min_temperature; }), 
                   d3.max(data, function(d){ return d.max_temperature; })])
        .range([0, grid_size.height]);
    var min_line = d3.line()
        .x(function(d){ return line_x_scale(d.day); })
        .y(function(d){ return line_y_scale(d.min_temperature); });
    var max_line = d3.line()
        .x(function(d){ return line_x_scale(d.day); })
        .y(function(d){ return line_y_scale(d.max_temperature); });
    
    svg.append("g").selectAll("path")
        .data(month_max_min)
        .enter()   
        .append('path')
        .attr('class', 'line')
        .attr('d', function(d){ return min_line(d.daily_d);})
        .attr("stroke", "pink")
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr('transform', function(d){ 
            return "translate(" + (x_scale(d.year) + 15)  + "," + (y_scale(d.month) + 5) + ")"; });
        
    svg.append("g").selectAll("path")
        .data(month_max_min)
        .enter()    
        .append('path')
        .attr('class', 'line')
        .attr('d', function(d){ return max_line(d.daily_d);})
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr('transform', function(d){ 
            return "translate(" + (x_scale(d.year) + 15) + "," + (y_scale(d.month) + 5) + ")"; });  


   return grids;
   }

