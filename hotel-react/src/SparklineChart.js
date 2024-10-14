import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const SparklineCharts = ({ data }) => {
  const [totalAdults, setTotalAdults] = useState([]);
  const [totalChildren, setTotalChildren] = useState([]);

  const groupVisitorsByDate = (data) => {
    return data.reduce((acc, { arrival_date_month, arrival_date_day_of_month, adults, children }) => {
      const key = `${arrival_date_month}-${arrival_date_day_of_month}`; 
      if (!acc[key]) {
        acc[key] = { adults: 0, children: 0 };
      }
      acc[key].adults += adults;
      acc[key].children += children;
      return acc;
    }, {});
  };

  

  const prepareSparklineData = (groupedData) => {
    const months = Object.keys(groupedData);
    const totalAdults = months.map(month => groupedData[month].adults);
    const totalChildren = months.map(month => groupedData[month].children);
    return { totalAdults, totalChildren, months };
  };

  useEffect(() => {
    if (data.length > 0) {
     const groupedData = groupVisitorsByDate(data);
     const { totalAdults, totalChildren } = prepareSparklineData(groupedData);
      setTotalAdults(totalAdults);
      setTotalChildren(totalChildren);
    }
  }, [data]);

  const optionsAdult = {
    series: [{
      name: 'Adults',
      data: totalAdults,
    }],
    chart: {
      fontFamily: 'Poppins',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 0.3,
    },
    xaxis: {
        crosshairs: {
          width: 1
        },
    },
    yaxis: {
      min: 0,
      show: false,
    },
    title: {
      text: `${totalAdults.reduce((a, b) => a + b, 0)}`,
      offsetX: 0,
      style: {
        fontSize: '24px',
      },
    },
    subtitle: {
      text: 'Total Adult Visitors',
      offsetX: 0,
      style: {
        fontSize: '14px',
      },
    },
  };

  const optionsChildren = {
    series: [{
      name: 'Children',
      data: totalChildren,
    }],
    chart: {
      fontFamily: 'Poppins',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'straight',
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
      show: false,
    },
    colors: ['#00E396'],
    title: {
      text: `${totalChildren.reduce((a, b) => a + b, 0)}`, // Total children
      offsetX: 0,
      style: {
        fontSize: '24px',
      },
    },
    subtitle: {
      text: 'Total Children Visitors',
      offsetX: 0,
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-4">
      <div id="chart-spark1" className="w-full shadow-lg border-2 border-gray-200  rounded-lg overflow-hidden">
        <ApexCharts options={optionsAdult} series={optionsAdult.series} type="area" height={160} />
      </div>
      <div id="chart-spark2" className="w-full shadow-lg border-2 border-gray-200  rounded-lg overflow-hidden">
        <ApexCharts options={optionsChildren} series={optionsChildren.series} type="area" height={160} />
      </div>
    </div>
  );
};

export default SparklineCharts;
