import { useD3, useWindowDimensions } from '../../../utils/hooks';
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  const { width } = useWindowDimensions();
  const [chartData, updateChartData] = useState(['']);
  const [tickLabels, updateTickLabels] = useState(['']);
  const [verticalUnit, updateVerticalUnit] = useState('');
  //const [horizontalUnit, updateHorizontalUnit] = useState(['']);

  useEffect(() => {
    if (data.chartData) {
      const intChartData = () => {
        return data.chartData.map(Number);
      };
      updateChartData(intChartData);
    }
    updateTickLabels(data.tickLabels);
    updateVerticalUnit(data.verticalUnit);
    //updateHorizontalUnit(data.horizontalUnit);
  }, [data]);

  const ref = useD3(
    (svg) => {
      d3.selectAll('svg').remove();
      //  the size of the overall svg element
      var chartHeight = 200,
        chartWidth = (50 / 100) * width;

      var margin = { top: 30, right: 50, bottom: 120, left: 70 };
      var dynamicColor;
      var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData)])
        .range([0, chartHeight]);

      var xScale = d3
        .scaleBand()
        .domain(d3.range(0, chartData.length))
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
        .data(chartData)
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
        .domain([0, d3.max(chartData)])
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
        .tickSize(chartData.length)
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
    },
    [chartData, width]
  );

  return (
    <div className="barChartContainer">
      <div id="bar-chart" ref={ref}></div>
    </div>
  );
}

export default BarChart;
