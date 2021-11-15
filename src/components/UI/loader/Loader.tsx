const cssClasses = require('./Loader.module.css');

export default function Loader() {
    return (
        <div className={cssClasses.loader}>
        </div>
    );
};
