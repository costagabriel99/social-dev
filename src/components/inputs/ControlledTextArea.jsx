import { useController } from "react-hook-form";

import Textarea from "./Textarea";

const ControlledTextArea = ({name, control, defaultValue = '', ...props}) => {
    const {
        field: {value, onChange}
     } = useController({ name, control, defaultValue })

    return (
        <Textarea {...props} value={value} onChange={onChange} />

    )
}

export default ControlledTextArea