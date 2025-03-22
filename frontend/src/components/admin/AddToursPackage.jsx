import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAddTourPackages } from "@/hooks/tourPackages.hook";
import { addTourPackageToStore } from "@/store/tourPackagesSlice";

const AddPackage = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { control, handleSubmit, register, setValue, watch } = useForm();
    const [details, setDetails] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const { destinations } = useSelector(state => state.destination);
    
    const [selectedDestinations, setSelectedDestinations] = useState([]);

    const {loading, callApi: addToursPackages} = useAddTourPackages();

    // Extract destinations from redux state
    const destinationOptions = destinations?.map(destination => ({
        value: destination._id,
        label: destination.packageName
    })) || [];

    const handleAddDetail = () => {
        setDetails([...details, { heading: "", description: "" }]);
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = value;
        setDetails(updatedDetails);
    };

    const handleRemoveDetail = (index) => {
        setDetails(details.filter((_, i) => i !== index));
    };

    const handleAddFAQ = () => {
        setFaqs([...faqs, { Question: "", Answer: "" }]);
    };

    const handleFAQChange = (index, field, value) => {
        const updatedFAQs = [...faqs];
        updatedFAQs[index][field] = value;
        setFaqs(updatedFAQs);
    };

    const handleRemoveFAQ = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const handleDestinationChange = (selected) => {
        setSelectedDestinations(selected);
        setValue("Destinations", selected.map((s) => s.value));
    };

    const onSubmit = async(data) => {
        const finalData = {
            ...data,
            Details: details,
            FAQ: faqs,
            Destinations: selectedDestinations.map((s) => s.value),
        };
        
        const res = await addToursPackages(finalData);
        if(res) {
            console.log(res.message);
            dispatch(addTourPackageToStore(res.data));
            navigate(-1);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">Add New Tour Package</h2>
                    <Button variant='destructive' onClick={()=> navigate(-1)} >Cancel</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input {...register("Heading", { required: true })} placeholder="Package Heading" required />
                        <Textarea {...register("Description")} placeholder="Package Description" />

                        {/* Multi-Select for Destinations */}
                        <div>
                            <label className="block text-sm font-medium">Destinations</label>
                            <Controller
                                name="Destinations"
                                control={control}
                                render={() => (
                                    <Select
                                        value={selectedDestinations}
                                        options={destinationOptions}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={handleDestinationChange}
                                    />
                                )}
                            />
                        </div>

                        {/* Details Section */}
                        <div>
                            <h3 className="font-medium">Details</h3>
                            {details.map((detail, index) => (
                                <div key={index} className="flex gap-2 my-2 items-center">
                                    <Input
                                        placeholder="Detail Heading"
                                        value={detail.heading}
                                        onChange={(e) => handleDetailChange(index, "heading", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Detail Description"
                                        value={detail.description}
                                        onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                                    />
                                    <Button variant="destructive" size="icon" onClick={() => handleRemoveDetail(index)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" onClick={handleAddDetail} className="mt-2">
                                Add Detail
                            </Button>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 className="font-medium">FAQ</h3>
                            {faqs.map((faq, index) => (
                                <div key={index} className="flex gap-2 my-2 items-center">
                                    <Input
                                        placeholder="Question"
                                        value={faq.Question}
                                        onChange={(e) => handleFAQChange(index, "Question", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Answer"
                                        value={faq.Answer}
                                        onChange={(e) => handleFAQChange(index, "Answer", e.target.value)}
                                    />
                                    <Button variant="destructive" size="icon" onClick={() => handleRemoveFAQ(index)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" onClick={handleAddFAQ} className="mt-2">
                                Add FAQ
                            </Button>
                        </div>

                        <Button type="submit" className="w-full">
                            {loading? 'Submiting...':'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddPackage;
