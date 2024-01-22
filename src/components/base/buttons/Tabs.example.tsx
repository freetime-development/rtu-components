import { Tabs, TabProps } from './Tabs';

enum Status {
  A = 'a',
  B = 'b',
}

type Option = {
  value: Status;
  label: string;
};

export const TabExample = (props: TabProps<Option>) => {
  return (
    <Tabs onClick={props.onClick} value={props.value} options={props.options} />
  );
};
