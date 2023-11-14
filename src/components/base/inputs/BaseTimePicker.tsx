import { Button, Icon, Switch } from '@/components';
import useMeridiemTime from '@/hooks/useMeridiemTime';

interface TimePickerProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
}

const meridiemOptions = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

export const BaseTimePicker = ({ value, onChange, open }: TimePickerProps) => {
  const {
    decrementHours,
    decrementMinutes,
    handleMeridiemChange,
    incrementHours,
    incrementMinutes,
    meridiem,
    meridiemHours,
    meridiemMinutes,
  } = useMeridiemTime(value, onChange);

  if (!open) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center">
        <div className="flex flex-col items-center p-5">
          <Button onClick={incrementHours} variant="outlined">
            <Icon name="arrow-up2" />
          </Button>
          <div className="my-2 text-gray-9">{meridiemHours}</div>
          <Button onClick={decrementHours} variant="outlined">
            <Icon name="arrow-down2" />
          </Button>
        </div>

        <div>:</div>

        <div className="flex flex-col items-center p-5">
          <Button onClick={incrementMinutes} variant="outlined">
            <Icon name="arrow-up2" />
          </Button>
          <div className="my-2 text-gray-9">{meridiemMinutes}</div>
          <Button onClick={decrementMinutes} variant="outlined">
            <Icon name="arrow-down2" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <Switch
          value={meridiem}
          options={meridiemOptions}
          onClick={handleMeridiemChange}
        />
      </div>
    </div>
  );
};
