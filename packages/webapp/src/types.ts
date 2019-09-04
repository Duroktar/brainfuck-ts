export type ReactMouseClickEvent = (
    event: React.MouseEvent<
        HTMLElement,
        MouseEvent
    >
) => void;

export type HtmlElementProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
>
