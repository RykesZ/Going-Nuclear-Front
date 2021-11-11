import { useD3, useWindowDimensions } from '../../../utils/hooks';
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { useState } from 'react';

function BarChart() {
  const { width, height } = useWindowDimensions();

  var chartdata = [820, 490, 38, 24, 12, 27, 44, 12];

  let verticalUnit = `gCO2eq/kWh`;
  let horizontalUnit1 = 'Technologies actuellement';
  let horizontalUnit2 = 'disponibles commercialement';
  let tickLabels = [
    'Charbon',
    'Gaz',
    'Géothermie',
    'Hydroélectricité',
    'Nucléaire',
    'Énergie solaire concentrée',
    'Solaire photovoltaïque',
    'Éolien',
  ];

  const ref = useD3(() => {
    //  the data that powers the bar chart, a simple array of numeric values

    //  the size of the overall svg element
    var chartHeight = 200,
      chartWidth = (50 / 100) * width;

    var margin = { top: 30, right: 50, bottom: 120, left: 70 };
    var dynamicColor;
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata)])
      .range([0, chartHeight]);

    var xScale = d3
      .scaleBand()
      .domain(d3.range(0, chartdata.length))
      .range([0, chartWidth])
      .padding(0.1);

    // Définit le graphique en barres
    d3.select('#bar-chart')
      .append('svg')
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom)
      .style('fill', '#1976d2')
      .style('background', '#B0D1FF')
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
        return chartHeight - yScale(data);
      })
      .on('mouseover', function (data) {
        dynamicColor = this.style.fill;
        d3.select(this).style('fill', '#004ba0');
      })
      .on('mouseout', function (data) {
        d3.select(this).style('fill', dynamicColor);
      });

    var verticalGuideScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata)])
      .range([chartHeight, 0]);

    var vAxis = d3.axisLeft().scale(verticalGuideScale).ticks(10);

    var verticalGuide = d3
      .select('svg')
      .append('g')
      .call((g) =>
        g
          .append('text')
          .attr('x', -margin.left / 1.1)
          .attr('y', -margin.top / 2)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(verticalUnit)
      );
    vAxis(verticalGuide);
    verticalGuide.attr(
      'transform',
      'translate(' + margin.left + ', ' + margin.top + ')'
    );
    verticalGuide
      .selectAll('path')
      .style('fill', 'none')
      .style('stroke', '#004ba0');
    verticalGuide.selectAll('line').style('stroke', '#004ba0');

    var hAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickSize(chartdata.length)
      .tickFormat(function (data, i) {
        return tickLabels[i];
      })
      .tickSize(0);

    var horizontalGuide = d3.select('svg').append('g');
    hAxis(horizontalGuide);
    horizontalGuide.attr(
      'transform',
      'translate(' + margin.left + ', ' + (chartHeight + margin.top) + ')'
    );
    horizontalGuide
      .selectAll('path')
      .style('fill', 'none')
      .style('stroke', '#004ba0');
    horizontalGuide.selectAll('line').style('stroke', '#004ba0');

    horizontalGuide
      .selectAll('.tick text')
      .style('padding', '20px')
      .attr('transform', 'rotate(-65)')
      .attr('text-anchor', 'end');
  }, [chartdata.length]);

  return (
    <div className="barChartContainer">
      <h2>Create a bar chart with d3 js</h2>
      <div id="bar-chart" ref={ref}></div>
    </div>
  );
}

export default BarChart;
