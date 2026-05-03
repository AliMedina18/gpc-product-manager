import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import { gpcService } from '../services/gpcService';

export const ExplorerPage = () => {
  const [segments, setSegments] = useState([]);
  const [expandedSegment, setExpandedSegment] = useState(null);
  const [expandedFamily, setExpandedFamily] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null);
  const [expandedBrick, setExpandedBrick] = useState(null);
  const [loading, setLoading] = useState(false);
  const [levelData, setLevelData] = useState({});

  useEffect(() => {
    loadSegments();
  }, []);

  const loadSegments = async () => {
    try {
      setLoading(true);
      const response = await gpcService.getSegments();
      setSegments(response.data);
    } catch (error) {
      console.error('Error cargando segments:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFamilies = async (segmentId) => {
    if (levelData[`families-${segmentId}`]) {
      setExpandedSegment(expandedSegment === segmentId ? null : segmentId);
      return;
    }

    try {
      setLoading(true);
      const response = await gpcService.getFamilies(segmentId);
      setLevelData((prev) => ({
        ...prev,
        [`families-${segmentId}`]: response.data,
      }));
      setExpandedSegment(expandedSegment === segmentId ? null : segmentId);
    } catch (error) {
      console.error('Error cargando families:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClasses = async (familyId) => {
    if (levelData[`classes-${familyId}`]) {
      setExpandedFamily(expandedFamily === familyId ? null : familyId);
      return;
    }

    try {
      setLoading(true);
      const response = await gpcService.getClasses(familyId);
      setLevelData((prev) => ({
        ...prev,
        [`classes-${familyId}`]: response.data,
      }));
      setExpandedFamily(expandedFamily === familyId ? null : familyId);
    } catch (error) {
      console.error('Error cargando classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBricks = async (classId) => {
    if (levelData[`bricks-${classId}`]) {
      setExpandedClass(expandedClass === classId ? null : classId);
      return;
    }

    try {
      setLoading(true);
      const response = await gpcService.getBricks(classId);
      setLevelData((prev) => ({
        ...prev,
        [`bricks-${classId}`]: response.data,
      }));
      setExpandedClass(expandedClass === classId ? null : classId);
    } catch (error) {
      console.error('Error cargando bricks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAttributes = async (brickId) => {
    if (levelData[`attributes-${brickId}`]) {
      setExpandedBrick(expandedBrick === brickId ? null : brickId);
      return;
    }

    try {
      setLoading(true);
      const response = await gpcService.getAttributes(brickId);
      setLevelData((prev) => ({
        ...prev,
        [`attributes-${brickId}`]: response.data,
      }));
      setExpandedBrick(expandedBrick === brickId ? null : brickId);
    } catch (error) {
      console.error('Error cargando attributes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explorador GPC</h1>
        <p className="text-gray-600 mt-2">Navega por la jerarquía completa de clasificación de productos</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Spinner size="sm" />
        </div>
      )}

      <div className="space-y-3">
        {segments.map((segment) => (
          <Card key={segment.id}>
            <CardBody>
              <button
                onClick={() => loadFamilies(segment.id)}
                className="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedSegment === segment.id ? '▼' : '▶'}</span>
                  <Badge variant="primary">{segment.nombre}</Badge>
                </div>
              </button>

              {expandedSegment === segment.id && (
                <div className="mt-4 ml-8 space-y-2">
                  {levelData[`families-${segment.id}`]?.map((family) => (
                    <div key={family.id}>
                      <button
                        onClick={() => loadClasses(family.id)}
                        className="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{expandedFamily === family.id ? '▼' : '▶'}</span>
                          <Badge variant="gray">{family.nombre}</Badge>
                        </div>
                      </button>

                      {expandedFamily === family.id && (
                        <div className="mt-2 ml-8 space-y-2">
                          {levelData[`classes-${family.id}`]?.map((cls) => (
                            <div key={cls.id}>
                              <button
                                onClick={() => loadBricks(cls.id)}
                                className="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{expandedClass === cls.id ? '▼' : '▶'}</span>
                                  <Badge variant="warning">{cls.nombre}</Badge>
                                </div>
                              </button>

                              {expandedClass === cls.id && (
                                <div className="mt-2 ml-8 space-y-2">
                                  {levelData[`bricks-${cls.id}`]?.map((brick) => (
                                    <div key={brick.id}>
                                      <button
                                        onClick={() => loadAttributes(brick.id)}
                                        className="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-xl">{expandedBrick === brick.id ? '▼' : '▶'}</span>
                                          <Badge variant="success">{brick.nombre}</Badge>
                                        </div>
                                      </button>

                                      {expandedBrick === brick.id && (
                                        <div className="mt-2 ml-8 space-y-1">
                                          {levelData[`attributes-${brick.id}`]?.map((attr) => (
                                            <div key={attr.id} className="flex items-center gap-2 text-sm text-gray-600">
                                              <span className="text-xl">•</span>
                                              <span>{attr.nombre}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </Layout>
  );
};
