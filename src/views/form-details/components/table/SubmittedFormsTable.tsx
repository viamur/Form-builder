import { GetFormWithSubmissions } from '@/server-actions/server-actions';
import { ElementsType, FormElementInstance } from '@/components/fields/FormElements';
import * as TableComponents from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import SubmittedFormsTableRowCell from './SubmittedFormsTableRowCell';

type Row = Record<string, string> & {
    submittedAt: Date;
};

type Props = {
    id: number;
};

export default async function SubmittedFormsTable({ id }: Props) {
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
                    label:
                        typeof element.extraAttributes?.label === 'string'
                            ? element.extraAttributes?.label
                            : element.type,
                    required:
                        typeof element.extraAttributes?.required === 'boolean'
                            ? element.extraAttributes?.required
                            : false,
                    type: element.type,
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
            submittedAt: submission.createdAt,
        });
    });

    return (
        <div className="container py-10">
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
                                    <SubmittedFormsTableRowCell
                                        key={column.id}
                                        type={column.type}
                                        value={row[column.id]}
                                    />
                                ))}
                                <TableComponents.TableCell className="text-muted-foreground text-right">
                                    {formatDistance(row.submittedAt, new Date(), {
                                        addSuffix: true,
                                    })}
                                </TableComponents.TableCell>
                            </TableComponents.TableRow>
                        ))}
                    </TableComponents.TableBody>
                </TableComponents.Table>
            </div>
        </div>
    );
}
