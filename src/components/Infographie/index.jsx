import BarChart from '../../components/infographies/BarChart';

function Infographie({ data, infoName }) {
  const component = () => {
    switch (infoName) {
      case 'BarChart':
        return <BarChart data={data} />;
      default:
        return null;
    }
  };
  return component();
}

export default Infographie;
