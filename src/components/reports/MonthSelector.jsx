import { Select } from '../common';

const MonthSelector = ({ selectedMonth, onMonthChange, months }) => {
    return (
        <div className="w-full sm:w-64">
            <Select
                label="Select Month"
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                options={months}
                placeholder="Choose a month"
            />
        </div>
    );
};

export default MonthSelector;
