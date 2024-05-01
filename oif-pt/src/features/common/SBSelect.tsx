import React, { CSSProperties } from 'react';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import { ThemeContext } from 'components/static/ThemeProvider';
import SBSpinner from './SBSpinner';
import { sbToastError, sbToastSuccess } from './SBToast';

// TODO: Underconstruction, see JADN Sanbbox for full capabilities
// TODO: Dark theme needed
// Note: Currently not used.... possible removal?

export const groupStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0',
    textAlign: 'center',
};

export interface Option {
    readonly value: string | any;
    readonly label: string;
}

export interface GroupedOption {
    readonly label: string;
    readonly options: readonly Option[];
}

const defaultStyle = {
    control: (base: any) => ({
        ...base,
        cursor: 'pointer'
    }),

    menu: (provided: any) => ({
        ...provided,
        borderLeft: 'var(--bs-border-width) solid var(--bs-border-color)',
        borderRight: 'var(--bs-border-width) solid var(--bs-border-color)',
        borderBottom: 'var(--bs-border-width) solid var(--bs-border-color)',
        marginTop: '0px'
    }),

    container: (css: any) => ({ ...css, flex: '1 1 auto', alignSelf: 'stretch' }),

    option: (styles: any) => ({
        ...styles,
        cursor: 'pointer',
        color: 'inherit'
    }),

    menuPortal: (base: any) => ({
        ...base,
        zIndex: 9999,
    })
}

const smStyle = {
    control: (base: any) => ({
        ...base,
        maxHeight: 30,
        minHeight: 30,
        cursor: 'pointer',
        border: 'var(--bs-border-width) solid var(--bs-border-color)',
    }),

    menu: (provided: any) => ({
        ...provided,
        borderLeft: 'var(--bs-border-width) solid var(--bs-border-color)',
        borderRight: 'var(--bs-border-width) solid var(--bs-border-color)',
        borderBottom: 'var(--bs-border-width) solid var(--bs-border-color)',
        marginTop: '0px',
        minWidth: '100%',
        width: 'auto'

    }),

    container: (css: any) => ({
        ...css,
        flex: '1 1 auto',
        alignSelf: 'stretch',
    }),

    valueContainer: (provided: any, state: any) => ({
        ...provided,
        textOverflow: "ellipsis",
        overflowY: state.hasValue && state.isMulti && !state.selectProps.menuIsOpen ? 'auto' : 'hidden',
        maxHeight: 30
    }),

    input: (provided: any) => ({
        ...provided,
        margin: '0px',
        paddingBottom: '0px'
    }),

    dropdownIndicator: (provided: any) => ({
        ...provided,
        padding: '0',
    }),

    indicatorsContainer: (provided: any) => ({
        ...provided,
        minHeight: 30,
        padding: '0',
    }),

    clearIndicator: (provided: any) => ({
        ...provided,
        padding: '0',
    }),

    option: (styles: any) => ({
        ...styles,
        cursor: 'pointer',
        color: 'inherit'
    }),

    menuPortal: (base: any) => ({
        ...base,
        zIndex: 9999,
    })
};

// TODO: Not needed, only using dark
export const getSelectTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
        return ({
            neutral0: 'var(--bs-body-bg)', //menu background
            neutral10: 'var(--bs-secondary-bg)', //multivalue selected option background
            neutral80: 'var(--bs-body-color)', //selected option text
            primary25: 'grey', //hover options
            primary75: 'var(--bs-primary-color)', //selected option indicator
        })
    }
    return;
}

const SBSelect = (props: any) => {

    const { id, data, onChange, placeholder, isMultiSelect, value, customClass, isSmStyle, isCreatable, isClearable, customNoOptionMsg } = props;

    // const { theme } = useContext(ThemeContext);
    // const themeColors = getSelectTheme(theme);

    const formatGroupLabel = (data: GroupedOption) => (
        <div style={groupStyles}>
            <span>{data.label}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    );

    // const Menu = (props: any) => {
    //     return (
    //         <Fragment>
    //             <components.Menu {...props}>
    //                 <div>
    //                     <div className='cursor-pointer'>{props.children}</div>
    //                     <hr />
    //                     <button type="button" className="list-group-item p-1 m-1 list-group-item-action"
    //                         onClick={() => onChange({ value: 'file' })}
    //                         style={customMenuOptionStyle}
    //                     >
    //                         Upload Custom File ...
    //                     </button>
    //                     <hr />
    //                     <button type="button" className="list-group-item p-1 m-1 list-group-item-action"
    //                         onClick={() => setToggleModal(true)}
    //                         style={customMenuOptionStyle}
    //                     >
    //                         Remove Custom Files
    //                     </button>
    //                 </div>
    //             </components.Menu>
    //         </Fragment >
    //     );
    // };

    let opts;
    // if (isGrouped) {
    //     opts = Object.keys(data).map((groupLabel) => ({
    //         label: groupLabel,
    //         options: Object.values(data[groupLabel]).map((opt) => ({
    //             value: `${groupLabel === 'custom' ? `custom/${opt}` : opt}`,
    //             label: opt
    //         }))
    //     }));

    //     customOpts = [];
    //     for (let i = 0; i < opts.length; i++) {
    //         if (opts[i].label === 'custom') {
    //             if (opts[i].hasOwnProperty('options') && opts[i].options.length !== 0) {
    //                 for (let j = 0; j < opts[i].options.length; j++) {
    //                     customOpts.push({
    //                         value: opts[i].options[j].value,
    //                         label: opts[i].options[j].label
    //                     });
    //                 }
    //             }
    //         }
    //     }

    //     customOptList = customOpts.map((opt, index) => (
    //         <label htmlFor={`${opt.label}`} className="list-group-item" style={{ textAlign: 'center' }} key={index}>
    //             <input id={`${opt.label}`} className="form-check-input me-1" type="checkbox" name={'custom-file'} value={`${opt.label}`} />
    //             {`${opt.label}`}
    //         </label>
    //     ));

    // } else {
        opts = data?.map((opt: Option) => ({
            value: (opt.value ? opt.value : opt), label: (opt.label ? opt.label : opt)
        }));
    // }

    // const deleteFiles = () => {
    //     var checkboxes = document.getElementsByName('custom-file');
    //     var deletionList = [];
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         if (checkboxes[i].checked) {
    //             deletionList.push(checkboxes[i].value);
    //         }
    //     }
    //     if (deletionList.length == 0) {
    //         setToggleModal(false);
    //         sbToastError('No files selected for deletion');
    //         return;
    //     } else {
    //         setIsLoading(true);
    //         try {
    //             dispatch(deleteFile(deletionList, loc))
    //                 .then((val) => {
    //                     if (val.error) {
    //                         setIsLoading(false);
    //                         sbToastError(`Error: ${val.payload.response}`);
    //                         setToggleModal(false);
    //                         return;
    //                     }
    //                     dispatch(info());
    //                     setIsLoading(false);
    //                     sbToastSuccess(val.payload);
    //                     setToggleModal(false);
    //                 })
    //                 .catch((err) => {
    //                     setIsLoading(false);
    //                     sbToastError(`Error: ${err.payload.response}`);
    //                     setToggleModal(false);
    //                 });
    //         } catch (err) {
    //             setIsLoading(false);
    //             sbToastError(`Error: ${err.payload.response}`);
    //             setToggleModal(false);
    //         }
    //     }
    // }

    if (isCreatable) {
        return (
            <div style={{ width: '100%' }}>
                <CreatableSelect<Option, false, GroupedOption>
                    id={id}
                    placeholder={placeholder}
                    options={opts}
                    formatGroupLabel={formatGroupLabel}
                    isClearable={isClearable}
                    onChange={onChange}
                    menuPortalTarget={document.body}
                    styles={isSmStyle ? smStyle : defaultStyle}
                    isMulti={isMultiSelect}
                    closeMenuOnSelect={isMultiSelect ? false : true}
                    value={value}
                    noOptionsMessage={() => customNoOptionMsg}
                />
            </div>
        );
    }

    return (
        <Select<Option, false, GroupedOption>
            id={id}
            placeholder={placeholder}
            options={opts}
            formatGroupLabel={formatGroupLabel}
            isClearable={isClearable}
            onChange={onChange}
            menuPortalTarget={document.body}
            className={customClass}
            styles={isSmStyle ? smStyle : defaultStyle}
            isMulti={isMultiSelect}
            closeMenuOnSelect={isMultiSelect ? false : true}
            backspaceRemovesValue={false}
            value={value}
            noOptionsMessage={() => customNoOptionMsg}
        />
    );
}

export default SBSelect;