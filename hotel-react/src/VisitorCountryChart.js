import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useEffect } from 'react';

const VisitorCountryChart = ({ data }) => {
    const [visitorCounts, setVisitorCounts] = useState([]); 
    const [countries, setCountries] = useState([]); 
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Visitors',
      data: visitorCounts, 
    }],
    options: {
      chart: {
        fontFamily: 'Poppins',
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: 'top', 
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(0); 
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: countries, 
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val.toFixed(0); 
          }
        }
      },
      title: {
        text: 'Number of Visitors per Country',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
  });

  const formatDataByCountry = (data) => {
    const countryMap = {};
    
    data.forEach((item) => {
      const visitors = item.adults + item.children + item.babies;
      const country = item.country;
  
      if (countryMap[country]) {
        countryMap[country] += visitors;
      } else {
        countryMap[country] = visitors;
      }
    });
  
    
    const countries = Object.keys(countryMap);
    const visitorCounts = Object.values(countryMap);
  
    return { countries, visitorCounts };
  };

  useEffect(() => {
    setChartData(prevChartData => ({
      ...prevChartData,
      series: [{
        name: 'Visitors',
        data: visitorCounts, 
      }],
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: countries, 
          position: 'top',
        }
      }
    }));
  }, [visitorCounts, countries]); 



  useEffect(() => {
    if (data.length > 0) {
      const { countries, visitorCounts } = formatDataByCountry(data);
      setCountries(countries);
      setVisitorCounts(visitorCounts);
    }
  }, [data]);

  
  return (
    <div className="p-8">
      <div className="w-full shadow-lg border-2 border-gray-200  rounded-lg overflow-hidden">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorCountryChart;
