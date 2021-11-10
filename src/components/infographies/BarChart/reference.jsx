import { useD3 } from '../../../utils/hooks';
import React from 'react';
import * as d3 from 'd3';
import { useState } from 'react';

function BarChart() {
  var chartdata = [
    40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140, 140, 120, 150, 70, 60,
    100, 120, 70, 100, 80, 60, 40,
  ];

  const ref = useD3(() => {
    //  the data that powers the bar chart, a simple array of numeric values

    //  the size of the overall svg element
    var height = 200,
      width = 720,
      //  the width of each bar and the offset between each bar
      barWidth = 40,
      barOffset = 20;

    var margin = { top: 30, right: 50, bottom: 50, left: 50 };
    var dynamicColor;
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata)])
      .range([0, height]);

    var xScale = d3
      .scaleBand()
      .domain(d3.range(0, chartdata.length))
      .range([0, width])
      .padding(0.1);

    // Définit le graphique en barres
    d3.select('#bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('fill', '#3c763d')
      .style('background', '#dff0d8')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
      .selectAll('rect')
      .data(chartdata)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', function (data) {
        return yScale(data);
      })
      .attr('x', function (data, i) {
        return xScale(i);
      })
      .attr('y', function (data) {
        return height - yScale(data);
      })
      .on('mouseover', function (data) {
        dynamicColor = this.style.fill;
        d3.select(this).style('fill', '#8c0900');
      })
      .on('mouseout', function (data) {
        d3.select(this).style('fill', dynamicColor);
      });

    var verticalGuideScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata)])
      .range([height, 0]);

    var vAxis = d3.axisLeft().scale(verticalGuideScale).ticks(10);

    var verticalGuide = d3.select('svg').append('g');
    vAxis(verticalGuide);
    verticalGuide.attr(
      'transform',
      'translate(' + margin.left + ', ' + margin.top + ')'
    );
    verticalGuide
      .selectAll('path')
      .style('fill', 'none')
      .style('stroke', '#3c763d');
    verticalGuide.selectAll('line').style('stroke', '#3c763d');

    var hAxis = d3.axisBottom().scale(xScale).tickSize(chartdata.length);

    var horizontalGuide = d3
      .select('svg')
      .append('g')
      .call((g) =>
        g
          .append('text')
          .attr('x', -(margin.left / 2))
          .attr('y', -(height + margin.top / 2))
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('coucou')
      );
    hAxis(horizontalGuide);
    horizontalGuide.attr(
      'transform',
      'translate(' + margin.left + ', ' + (height + margin.top) + ')'
    );
    horizontalGuide
      .selectAll('path')
      .style('fill', 'none')
      .style('stroke', '#3c763d');
    horizontalGuide.selectAll('line').style('stroke', '#3c763d');
  }, [chartdata.length]);

  return (
    <div className="barChartContainer">
      <h2>Create a bar chart with d3 js</h2>
      <div id="bar-chart" ref={ref}></div>
    </div>
  );
}

export default BarChart;
