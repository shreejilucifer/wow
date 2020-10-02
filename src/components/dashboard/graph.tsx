import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/company.module.css';
import dark from '../../styles/dark/company.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PreviousValue } from '../../generated/graphql';

const Graph: React.FC<{ data: PreviousValue[] }> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.graphContainer}>
      <div className={styles.graph}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='time'
              axisLine={
                theme
                  ? { stroke: '#404040', strokeWidth: 2 }
                  : { stroke: '#BCBCBC', strokeWidth: 2 }
              }
              tick={
                theme
                  ? { fontSize: '9px' }
                  : { fontSize: '9px', stroke: '#BCBCBC' }
              }
            />
            <YAxis
              axisLine={
                theme
                  ? { stroke: '#404040', strokeWidth: 2 }
                  : { stroke: '#BCBCBC', strokeWidth: 2 }
              }
              tick={
                theme
                  ? { fontSize: '9px' }
                  : { fontSize: '9px', stroke: '#BCBCBC' }
              }
            />
            <Tooltip />
            <Line type='monotone' dataKey='shareValue' stroke='#6FB353' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
