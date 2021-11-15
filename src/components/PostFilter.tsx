import CustomInput from "./UI/input/CustomInput";
import CustomSelectComponent from "./UI/select/CustomSelectComponent";

export interface Filter {
    sort: string;
    query: string;
}

interface PostFilterProps {
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

export default function PostFilter({filter, setFilter}: PostFilterProps) {
    return (
        <>
            <CustomInput 
                placeholder="Поиск..."
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <CustomSelectComponent 
                selDefault="Сортировка"
                selOptions={[
                    {value: "title", name: "По названию"},
                    {value: "body", name: "По описанию"},
                ]}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort.toString()})}
            />
        </>
    );
};