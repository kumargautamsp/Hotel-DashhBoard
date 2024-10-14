import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const VisitorChart = ({ data }) => {
const [seriesData, setSeriesData] = useState([]);

  const [chartData, setChartData] = useState({
    series: [{
      name: 'Number of Visitors',
      data: [], 
    }],
    options: {
      chart: {
        fontFamily: 'Poppins',
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        title: {
          text: 'Visitors',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    },
  });

  const formatData = (data) => {
    return data.map((item) => ({
      date: new Date(`${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`),
      visitors: item.adults + item.children + item.babies,
    }));
  };
  
  
 
  const groupByDate = (data) => {
    const dateMap = {};
    data.forEach(({ date, visitors }) => {
      const dateStr = date.toISOString().split('T')[0]; 
      if (dateMap[dateStr]) {
        dateMap[dateStr] += visitors;
      } else {
        dateMap[dateStr] = visitors;
      }
    });
    
    return Object.entries(dateMap).map(([date, visitors]) => ({
      x: new Date(date).getTime(),
      y: visitors,
    }));
  };

  useEffect(() => {
    if (data.length > 0) {
      const transformedData = formatData(data);
      const seriesData = groupByDate(transformedData);
      setSeriesData(seriesData);
    }
  }, [data]);

  useEffect(() => {
    setChartData(prevChartData => ({
      ...prevChartData,
      series: [{
        name: 'Number of Visitors',
        data: seriesData, 
      }],
    }));
  }, [seriesData]);


  return (
    <div className="p-8">
      <div className="w-full shadow-lg border-2 border-gray-200  rounded-lg overflow-hidden">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorChart;
