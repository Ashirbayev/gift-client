import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../redux/actions';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import CampaignForm from './CampaignForm';

interface Campaign {
    id: number;
    name: string;
    date: string;
    sentGifts: number;
}

const CampaignTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const campaigns = useAppSelector((state: RootState) => state.campaigns);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Campaign | null>(null);
    const [initialValues, setInitialValues] = useState({ name: '', date: '', sentGifts: 0 });

    useEffect(() => {
        dispatch(fetchCampaigns());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        console.log('Delete campaign with id:', id);
        dispatch(deleteCampaign(id));
    };

    const handleEdit = (campaign: Campaign) => {
        setInitialValues({ name: campaign.name, date: campaign.date, sentGifts: campaign.sentGifts });
        setEditing(campaign);
        setOpen(true);
    };

    const handleCreate = () => {
        setInitialValues({ name: '', date: '', sentGifts: 0 });
        setEditing(null);
        setOpen(true);
    };

    const handleSubmit = (values: any) => {
        if (editing) {
            dispatch(updateCampaign(editing.id, values));
        } else {
            dispatch(createCampaign(values));
        }
        setOpen(false);
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h1>Gift Campaigns</h1>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Создать Акцию
                </Button>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Название рассылки</TableCell>
                        <TableCell>Дата рассылки</TableCell>
                        <TableCell>Кол-во отправленных подарков</TableCell>
                        <TableCell>Отмена рассылки</TableCell>
                        <TableCell>Редактировать рассылку</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {campaigns.map((campaign: Campaign) => (
                        <TableRow key={campaign.id}>
                            <TableCell>{campaign.name}</TableCell>
                            <TableCell>{campaign.date}</TableCell>
                            <TableCell>{campaign.sentGifts}</TableCell>
                            <TableCell><Button onClick={() => handleDelete(campaign.id)}>Удалить</Button></TableCell>
                            <TableCell><Button onClick={() => handleEdit(campaign)}>Редактировать</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CampaignForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onClose={() => setOpen(false)}
                open={open}
            />
        </>
    );
};

export default CampaignTable;
