import React, { useState } from 'react';
import { Button, Card, Form, Input, DatePicker, Select, Upload, message, Steps, Modal, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Step } = Steps;
const { TextArea } = Input;

interface AddressDetails {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CADetails {
  firmName: string;
  accountantName: string;
  membershipNumber: string;
  certificateDate: string;
  certificateFile: File | null;
}

interface GoodsDetails {
  supplierType: 'GST' | 'CX/VAT';
  registrationNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  itemDetails: string;
}

const GSTR10Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [caDetails, setCADetails] = useState<CADetails>({
    firmName: '',
    accountantName: '',
    membershipNumber: '',
    certificateDate: '',
    certificateFile: null,
  });
  const [goodsDetails, setGoodsDetails] = useState<GoodsDetails[]>([]);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  const steps = [
    {
      title: 'Address Details',
      content: (
        <Card title="Update Address for Future Correspondence">
          <Form layout="vertical">
            <Form.Item label="Address" required>
              <TextArea rows={4} value={addressDetails.address} onChange={(e) => setAddressDetails({...addressDetails, address: e.target.value})} />
            </Form.Item>
            <Form.Item label="City" required>
              <Input value={addressDetails.city} onChange={(e) => setAddressDetails({...addressDetails, city: e.target.value})} />
            </Form.Item>
            <Form.Item label="State" required>
              <Input value={addressDetails.state} onChange={(e) => setAddressDetails({...addressDetails, state: e.target.value})} />
            </Form.Item>
            <Form.Item label="Pincode" required>
              <Input value={addressDetails.pincode} onChange={(e) => setAddressDetails({...addressDetails, pincode: e.target.value})} />
            </Form.Item>
            <Button type="primary" onClick={() => {
              message.success('Address details saved successfully');
              setCurrentStep(1);
            }}>
              Save
            </Button>
          </Form>
        </Card>
      ),
    },
    {
      title: 'CA Details',
      content: (
        <Card title="Particulars of certifying Chartered Accountant or Cost Accountant">
          <Form layout="vertical">
            <Form.Item label="Name of the certifying accounting firm" required>
              <Input value={caDetails.firmName} onChange={(e) => setCADetails({...caDetails, firmName: e.target.value})} />
            </Form.Item>
            <Form.Item label="Name of the certifying Chartered Accountant / Cost Accountant" required>
              <Input value={caDetails.accountantName} onChange={(e) => setCADetails({...caDetails, accountantName: e.target.value})} />
            </Form.Item>
            <Form.Item label="Membership number" required>
              <Input value={caDetails.membershipNumber} onChange={(e) => setCADetails({...caDetails, membershipNumber: e.target.value})} />
            </Form.Item>
            <Form.Item label="Date of certificate" required>
              <DatePicker onChange={(date) => setCADetails({...caDetails, certificateDate: date?.toISOString() || ''})} />
            </Form.Item>
            <Form.Item label="Certificate File" required>
              <Upload {...{
                beforeUpload: (file) => {
                  setCADetails({...caDetails, certificateFile: file});
                  return false;
                },
                maxCount: 1,
              }}>
                <Button icon={<UploadOutlined />}>Upload Certificate</Button>
              </Upload>
            </Form.Item>
            <Button type="primary" onClick={() => {
              message.success('CA details saved successfully');
              setCurrentStep(2);
            }}>
              Save CA Details
            </Button>
          </Form>
        </Card>
      ),
    },
    {
      title: 'Goods Details',
      content: (
        <Card title="Goods Details">
          <Tabs defaultActiveKey="withInvoices">
            <Tabs.TabPane tab="8A, 8B & 8C - Goods Details With Invoices" key="withInvoices">
              <Button type="primary" onClick={() => setGoodsDetails([...goodsDetails, {
                supplierType: 'GST',
                registrationNumber: '',
                invoiceNumber: '',
                invoiceDate: '',
                itemDetails: '',
              }])}>
                Add Details
              </Button>
              {goodsDetails.map((detail, index) => (
                <Card key={index} style={{ marginTop: 16 }}>
                  <Form layout="vertical">
                    <Form.Item label="Supplier's Registration">
                      <Select
                        value={detail.supplierType}
                        onChange={(value) => {
                          const newDetails = [...goodsDetails];
                          newDetails[index].supplierType = value;
                          setGoodsDetails(newDetails);
                        }}
                      >
                        <Select.Option value="GST">GST</Select.Option>
                        <Select.Option value="CX/VAT">CX/VAT</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label={detail.supplierType === 'GST' ? 'GSTIN' : 'CX/VAT Registration Number'}>
                      <Input
                        value={detail.registrationNumber}
                        onChange={(e) => {
                          const newDetails = [...goodsDetails];
                          newDetails[index].registrationNumber = e.target.value;
                          setGoodsDetails(newDetails);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Invoice/Bill of entry Number">
                      <Input
                        value={detail.invoiceNumber}
                        onChange={(e) => {
                          const newDetails = [...goodsDetails];
                          newDetails[index].invoiceNumber = e.target.value;
                          setGoodsDetails(newDetails);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Invoice/Bill of entry Date">
                      <DatePicker
                        onChange={(date) => {
                          const newDetails = [...goodsDetails];
                          newDetails[index].invoiceDate = date?.toISOString() || '';
                          setGoodsDetails(newDetails);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Item Details">
                      <TextArea
                        value={detail.itemDetails}
                        onChange={(e) => {
                          const newDetails = [...goodsDetails];
                          newDetails[index].itemDetails = e.target.value;
                          setGoodsDetails(newDetails);
                        }}
                      />
                    </Form.Item>
                  </Form>
                </Card>
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="8D - Goods Details Without Invoices" key="withoutInvoices">
              {/* Similar structure for goods without invoices */}
            </Tabs.TabPane>
          </Tabs>
          <Button type="primary" onClick={() => setCurrentStep(3)} style={{ marginTop: 16 }}>
            Save and Continue
          </Button>
        </Card>
      ),
    },
    {
      title: 'Preview and File',
      content: (
        <Card title="Preview and File GSTR-10">
          <Button type="primary" onClick={() => setIsPreviewModalVisible(true)}>
            Preview Draft GSTR-10
          </Button>
          <Button type="primary" style={{ marginLeft: 16 }}>
            Proceed to File
          </Button>
          <Modal
            title="Preview GSTR-10"
            visible={isPreviewModalVisible}
            onCancel={() => setIsPreviewModalVisible(false)}
            width={800}
            footer={null}
          >
            {/* Preview content */}
          </Modal>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: '24px' }}>
        {steps[currentStep].content}
      </div>
    </div>
  );
};

export default GSTR10Form;