import { GetFormWithSubmissions } from '@/actions/form';
import { ElementsType, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import * as TableComponents from '@/components/ui/table';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

type Row = Record<string, string> & {
    submittedAt: Date;
};

type Props = {
    id: number;
};

export default async function SubmissionsTable({ id }: Props) {
    const form = await GetFormWithSubmissions(id);
    if (!form) {
        throw new Error('form not found');
    }

    const formElements = JSON.parse(form.content) as FormElementInstance[];
    const columns: {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
    }[] = [];

    formElements.forEach((element) => {
        switch (element.type) {
            case 'TextField':
            case 'NumberField':
            case 'DateField':
            case 'ParagraphField':
            case 'SelectField':
            case 'TextAreaField':
            case 'CheckboxField':
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label || element.type,
                    required: element.extraAttributes?.required || false,
                    type: element.type
                });
                break;
            default:
                break;
        }
    });

    const rows: Row[] = [];

    form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
            ...content,
            submittedAt: submission.createdAt
        });
    });

    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
            <div className="rounded-md border">
                <TableComponents.Table>
                    <TableComponents.TableHeader>
                        <TableComponents.TableRow>
                            {columns.map((column) => (
                                <TableComponents.TableHead key={column.id} className="uppercase">
                                    {column.label}
                                </TableComponents.TableHead>
                            ))}
                            <TableComponents.TableHead className="text-muted-foreground text-right uppercase">
                                Submitted At
                            </TableComponents.TableHead>
                        </TableComponents.TableRow>
                    </TableComponents.TableHeader>
                    <TableComponents.TableBody>
                        {rows.map((row) => (
                            <TableComponents.TableRow key={row.submittedAt.toISOString()}>
                                {columns.map((column) => (
                                    <RowCell
                                        key={column.id}
                                        type={column.type}
                                        value={row[column.id]}
                                    />
                                ))}
                                <TableComponents.TableCell className="text-muted-foreground text-right">
                                    {formatDistance(row.submittedAt, new Date(), {
                                        addSuffix: true
                                    })}
                                </TableComponents.TableCell>
                            </TableComponents.TableRow>
                        ))}
                    </TableComponents.TableBody>
                </TableComponents.Table>
            </div>
        </>
    );
}

type RowCellProps = {
    type: ElementsType;
    value: string;
};

function RowCell({ type, value }: RowCellProps) {
    let node: React.ReactNode = value || '-';

    switch (type) {
        case 'DateField':
            if (!value) break;
            const date = new Date(value);
            node = <Badge>{format(date, 'dd/MM/yyyy')}</Badge>;
            break;
        case 'CheckboxField':
            node = <Checkbox checked={value === 'true'} disabled />;
            break;
        case 'SelectField':
            node = <Badge variant="outline">{value}</Badge>;
    }
    return <TableComponents.TableCell>{node}</TableComponents.TableCell>;
}
