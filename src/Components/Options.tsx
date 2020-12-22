import {
    memo,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import OptionsList from './OptionsList';

const Options = ({
    options,
    optionProps,
    snapshot,
    cls,
    renderGroupHeader,
    renderOption,
    emptyMessage,
}) => {
    const selectRef = useRef(null);
    const { value, highlighted } = snapshot;
    const renderEmptyMessage = useCallback(() => {
        if (emptyMessage === null) {
            return null;
        }

        return (
            <li className={cls('not-found')}>
                {(typeof emptyMessage === 'function') ? emptyMessage() : emptyMessage}
            </li>
        );
    }, [emptyMessage, cls]);

    useEffect(() => {
        const { current } = selectRef;

        if (!current || (highlighted < 0 && Array.isArray(value)) || value === null) {
            return;
        }

        const query = (highlighted > -1) ? `[data-index="${highlighted}"]` : `[data-value="${escape(value)}"]`;
        const selected = current.querySelector(query);

        if (selected) {
            const rect = current.getBoundingClientRect();
            const selectedRect = selected.getBoundingClientRect();

            current.scrollTop = selected.offsetTop - (rect.height / 2) + (selectedRect.height / 2);
        }
    }, [value, highlighted, selectRef]);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={cls('select')} ref={selectRef} onMouseDown={(e) => e.preventDefault()}>
            {options.length ? (
                <OptionsList
                    optionProps={optionProps}
                    snapshot={snapshot}
                    options={options}
                    renderOption={renderOption}
                    renderGroupHeader={renderGroupHeader}
                    cls={cls}
                />
            ) : (
                <ul className={cls('options')}>
                    {renderEmptyMessage()}
                </ul>
            )}
        </div>
    );
};

export default memo(Options);
