interface CustomSelectOption {
    value: string | number;
    name: string;
}

interface CustomSelectOnChange {
    (value: string): void;
}

interface CustomSelectComponentProps {
    selOptions: CustomSelectOption[];
    selDefault: string;
    onChange: CustomSelectOnChange;
    value?: string;
}

interface CustomSelectComponentPropsT extends React.ComponentProps<'select'> {
    selOptions: CustomSelectOption[];
    selDefault: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function CustomSelectComponent({
    selOptions,
    selDefault,
    onChange,
    value
} : CustomSelectComponentPropsT) {
    return (
        <>
            <select
                value={value}
                onChange={(e) => onChange(e)}
            >
                <option disabled value="" key="">{selDefault}</option>
                {selOptions.map((option) => 
                    <option value={option.value} key={option.value}>
                        {option.name}
                    </option>  
                )}
            </select>
        </>
    );
};
