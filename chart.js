function chart({width,height,data_2}={})
 {
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height])
    var tooltip = d3.select("body")
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
    
    svg.append("g")
      .selectAll("rect")
      .data(data_2)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.year)-50} )
        .attr("y", function(d) { return y(d.month)+5} )
        .attr("height", 60)
        .attr("width", 100)
        .attr("fill", d => color(d.max_temperature/40))
       .on("mouseover", function(){
                d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '.5');
                tooltip.style("visibility", "visible");})
       .on("mousemove", function(d){
                tooltip.html("Date:"+d.year+"-"+d.month+""+", max:"+d.max_temperature+", min:"+d.min_temperature)
                tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
       .on("mouseout", function(){
                d3.select(this).transition()
                  .duration('50')
                  .attr('opacity', '1');
                tooltip.style("visibility", "hidden");})
    
    // const path = svg.append("g")
    //     .attr("fill", "none")
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 1.5)
    //     .attr("stroke-linejoin", "round")
    //     .attr("stroke-linecap", "round")
    //   .selectAll("path")
    //   .data(data_2008)
    //   .enter()
    //   .append("path")
    //     .attr("d", d => line0(d))
    
    // const path1 = svg.append("g")
    //     .attr("fill", "none")
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 1.5)
    //     .attr("stroke-linejoin", "round")
    //     .attr("stroke-linecap", "round")
    //     .append("path")
    //       .attr("d",line0(data_2008))
          
    
    
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    return svg.node();
    }

