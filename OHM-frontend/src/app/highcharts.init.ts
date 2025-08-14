
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

// Initialize exporting module
try{
    (HC_exporting as any)(Highcharts);
}
catch (error) {
    console.error('Highcharts exporting module failed to initialize:', error);
}
export default Highcharts;
