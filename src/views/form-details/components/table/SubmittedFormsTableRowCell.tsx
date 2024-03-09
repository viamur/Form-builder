import { ElementsType } from '@/components/fields/FormElements';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import * as TableComponents from '@/components/ui/table';
import React from 'react';

type Props = {
    type: ElementsType;
    value: string;
};

function SubmittedFormsTableRowCell({ type, value }: Props) {
    let node: React.ReactNode = value || '-';

    switch (type) {
        case 'DateField':
            if (!value) break;
            node = <Badge>{format(new Date(value), 'dd/MM/yyyy')}</Badge>;
            break;
        case 'CheckboxField':
            node = <Checkbox checked={value === 'true'} disabled />;
            break;
        case 'SelectField':
            node = <Badge variant="outline">{value}</Badge>;
    }
    return <TableComponents.TableCell>{node}</TableComponents.TableCell>;
}

export default SubmittedFormsTableRowCell;
