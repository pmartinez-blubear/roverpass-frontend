import LoaderCircle from "../loaders/LoadingCircle";

interface PrimaryButtonProps {
    type: 'submit' | 'button';
    title: string;
    isLoading?: boolean;
    click: () => void;
    classType?: 'buttonPrimary' | 'buttonSecundary';
}

function PrimaryButton({ type, title, isLoading = false, click, classType = 'buttonPrimary' } : PrimaryButtonProps) {
  return <button onClick={click} className={classType} type={type} disabled={isLoading}>
    { isLoading ? <LoaderCircle color={classType} /> : title }
    </button>;
}

export default PrimaryButton;