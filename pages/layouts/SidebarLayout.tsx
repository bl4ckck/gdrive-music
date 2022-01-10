import type {IconType} from 'react-icons';
import { BiHomeAlt, BiArch } from 'react-icons/bi';

const SidebarLayout = (): JSX.Element => {
    const Item = (props: {title: string, active?: boolean, icon: IconType}): JSX.Element => {
        return (
            <div className={"md:flex cursor-pointer md:mb-4 md:p-2 md:w-full " + `${props.active ?
                "md:rounded-md md:shadow-md" : "md:text-drib-gray"}`}>
                <props.icon size={20} className="hidden md:block md:mr-2" />
                {props.title}
            </div>
        )
    }
    return (
        <div className="fixed top-0 z-50 flex items-baseline py-5 space-x-4
                    w-full px-4 bg-white shadow-md
                    md:w-[200px] md:space-x-0 md:z-0 md:flex-col
                    md:pt-4 md:pb-0 md:shadow-none md:min-h-screen">
            <div className="text-xl font-bold cursor-pointer md:mb-8">Storage Music.</div>
            <Item title="Home" icon={BiHomeAlt} active={true} />
            <Item title="Item 1" icon={BiArch} active={false}/>
        </div>
    )
}

export default SidebarLayout