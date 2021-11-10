/*let firstObject = data[0];
  let keys = Object.keys(firstObject);
  console.log(keys);
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.sales)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .style('color', 'steelblue')
          .call(d3.axisLeft(y1).ticks(null, 's'))
          .call((g) => g.select('.domain').remove())
          .call((g) =>
            g
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
              .text(data.y1)
          );

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(y1Axis);

      svg
        .select('.plot-area')
        .attr('fill', 'steelblue')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(d.sales))
        .attr('height', (d) => y1(0) - y1(d.sales));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );*/

/*return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );*/

// function BarChart(
//   { data },
//   {
//     x = (d, i) => i, // given d in data, returns the (ordinal) x-value
//     y = (d) => d, // given d in data, returns the (quantitative) y-value
//     title, // given d in data, returns the title text
//     marginTop = 20, // the top margin, in pixels
//     marginRight = 0, // the right margin, in pixels
//     marginBottom = 30, // the bottom margin, in pixels
//     marginLeft = 40, // the left margin, in pixels
//     width = 640, // the outer width of the chart, in pixels
//     height = 400, // the outer height of the chart, in pixels
//     xDomain, // an array of (ordinal) x-values
//     xRange = [marginLeft, width - marginRight], // [left, right]
//     yType = d3.scaleLinear, // y-scale type
//     yDomain, // [ymin, ymax]
//     yRange = [height - marginBottom, marginTop], // [bottom, top]
//     xPadding = 0.1, // amount of x-range to reserve to separate bars
//     yFormat, // a format specifier string for the y-axis
//     yLabel, // a label for the y-axis
//     color = 'currentColor', // bar fill color
//   }
// ) {
//   let firstObject = data[0];
//   let keys = Object.keys(firstObject);
//   console.log(keys);
//   const ref = useD3(() => {
//     // Copyright 2021 Observable, Inc.
//     // Released under the ISC license.
//     // https://observablehq.com/@d3/bar-chart
//     // Compute values.
//     const X = d3.map(data, x);
//     const Y = d3.map(data, y);

//     console.log(Y);

//     // Compute default domains, and unique the x-domain.
//     if (xDomain === undefined) xDomain = X;
//     if (yDomain === undefined) yDomain = [0, d3.max(Y)];
//     xDomain = new d3.InternSet(xDomain);

//     // Omit any data not present in the x-domain.
//     const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

//     // Construct scales, axes, and formats.
//     const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
//     const yScale = yType(yDomain, yRange);
//     const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
//     const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

//     // Compute titles.
//     if (title === undefined) {
//       const formatValue = yScale.tickFormat(100, yFormat);
//       title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
//     } else {
//       const O = d3.map(data, (d) => d);
//       const T = title;
//       title = (i) => T(O[i], i, data);
//     }

//     const svg = d3
//       .create('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .attr('viewBox', [0, 0, width, height])
//       .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

//     svg
//       .append('g')
//       .attr('transform', `translate(${marginLeft},0)`)
//       .call(yAxis)
//       .call((g) => g.select('.domain').remove())
//       .call((g) =>
//         g
//           .selectAll('.tick line')
//           .clone()
//           .attr('x2', width - marginLeft - marginRight)
//           .attr('stroke-opacity', 0.1)
//       )
//       .call((g) =>
//         g
//           .append('text')
//           .attr('x', -marginLeft)
//           .attr('y', 10)
//           .attr('fill', 'currentColor')
//           .attr('text-anchor', 'start')
//           .text(yLabel)
//       );

//     const bar = svg
//       .append('g')
//       .attr('fill', color)
//       .selectAll('rect')
//       .data(I)
//       .join('rect')
//       .attr('x', (i) => xScale(X[i]))
//       .attr('y', (i) => yScale(Y[i]))
//       .attr('height', (i) => yScale(0) - yScale(Y[i]))
//       .attr('width', xScale.bandwidth());

//     if (title) bar.append('title').text(title);

//     svg
//       .append('g')
//       .attr('transform', `translate(0,${height - marginBottom})`)
//       .call(xAxis);
//   }, [data.length]);

//   return <svg ref={ref}></svg>;
// }
