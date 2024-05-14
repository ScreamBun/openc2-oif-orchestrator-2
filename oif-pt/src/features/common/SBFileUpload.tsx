const SBFileUpload = (props: any) => {

    const { 
        fieldId, 
        fieldTitle = 'Upload a file', 
        dataKey,
        // dataValue,    
        // customClass, 
        filesAccepted,
        // isMultipleFiles,
        sendChangeToParent
    } = props;

    // const [sbFileValue, setSbFileValue] = useState<string>(''); 

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log("onFileChange e.target.name: " + e.target.name);
        console.log("onFileChange e.target.value: " + e.target.value);
        const fileKey = e.target.name;
        // const fileValue = e.target.value;
        let filename = "";

        // TODO: isMultipleFiles....

        if(e.target.files != null && e.target.files.length > 0) {
            // console.log("e.target.files: " + e.target.files[0].name);
            filename = e.target.files[0].name
        } 

        sendChangeToParent(fileKey, filename);
    } 
    
    return (
        <input 
            id={fieldId} 
            name={dataKey} 
            title={fieldTitle} 
            type='file' 
            className="form-control" 
            accept={filesAccepted} 
            // value={sbFileValue}
            onChange={onFileChange} 
        />
    )
}
export default SBFileUpload;